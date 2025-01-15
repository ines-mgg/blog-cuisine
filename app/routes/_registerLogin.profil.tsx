import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { database } from "~/utils/db.server";
import { getSession } from "~/server/session.server";
import Logout, { action } from "./logout";

export { action };
export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("cookie"));
  if (!session.has("user")) {
    return redirect("/");
  }
  const userId = session.get("user").id;
  const user = await database.user.findUnique({
    where: { id: userId },
  });
  return user;
}

export default function Profil() {
  const user = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Profil</h1>
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Email: {user?.email}</p>
        </div>
      </div>
      <Logout />
    </div>
  );
}
