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

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = await database.role.findFirst({ where: { name: "User" } });

  const user = await database.user.create({
    data: { email, password: hashedPassword, roleId: role?.id ?? "" },
  });
  const session = await getSession(request.headers.get("cookie"));
  session.set("user", {
    id: user.id,
    email: user.email,
    roleName: role?.name ?? "",
    roleId: role?.id ?? "",
  });

  return redirect("/", {
    headers: { "set-cookie": await commitSession(session) },
  });
}

export default function Register() {
  const registerFetcher = useFetcher<typeof action>();
  return (
    <>
      <registerFetcher.Form
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
        <Button label="Inscription" ariaLabel="Inscription" />
        <Link
          to="/login"
          className="text-2xl font-bold text-[#FF6B35] underline"
        >
          Connexion
        </Link>
      </registerFetcher.Form>
    </>
  );
}
