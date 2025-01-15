import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { getSession, destroySession } from "~/server/session.server";
import { useFetcher } from "@remix-run/react";
import Button from "~/components/Button";

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("cookie"));
  if (!session.has("user")) {
    return redirect("/");
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  let session = await getSession(request.headers.get("cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

export default function Logout() {
  const logoutFetcher = useFetcher<typeof action>();
  return (
    <logoutFetcher.Form method="post">
      <Button label="Déconnexion" ariaLabel="Déconnexion" />
    </logoutFetcher.Form>
  );
}
