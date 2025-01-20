import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import type { LoaderFunction } from "@remix-run/node";
import { getSession } from "~/server/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const user = session.get("user");
  return { user };
};

export default function RegisterLogin() {
  const { user } = useLoaderData<{ user?: { roleName: string } }>();

  return (
    <>
      <Header user={user} />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 to-orange-400 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </>
  );
}
