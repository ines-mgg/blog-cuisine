import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { z } from "zod";
import { getSession, commitSession } from "~/server/session.server";
import { database } from "~/utils/db.server";
import bcrypt from "bcrypt";
import { useFetcher, Link } from "@remix-run/react";
import Input from "~/components/Input";
import Button from "~/components/Button";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  if (session.has("user")) {
    return redirect("/profil");
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = z.string().parse(formData.get("email"));
  const password = z.string().parse(formData.get("password"));

  if (!email || !password) {
    throw new Error("Email et mot de passe sont requis");
  }

  const user = await database.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }
  const session = await getSession(request.headers.get("cookie"));
  session.set("user", {
    id: user.id,
    email: user.email,
    roleName: user.role.name,
    roleId: user.role.id,
  });

  return redirect("/profil", {
    headers: { "set-cookie": await commitSession(session) },
  });
}

export default function Login() {
  const loginFetcher = useFetcher<typeof action>();
  return (
    <>
      <loginFetcher.Form
        method="post"
        className="flex flex-col items-center gap-4"
      >
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          ariaLabel="Email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Mot de passe"
          ariaLabel="Mot de passe"
        />
        <Button label="Connexion" ariaLabel="Connexion" />
        <Link
          to="/register"
          className="text-2xl font-bold text-[#FF6B35] underline"
        >
          Inscription
        </Link>
      </loginFetcher.Form>
    </>
  );
}
