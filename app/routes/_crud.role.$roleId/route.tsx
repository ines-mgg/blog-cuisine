import { useLoaderData, NavLink } from "@remix-run/react";
import loader from "./getRole";
import action from "./deleteRoleAction";
import DeleteForm from "./deleteForm";
import DataCard from "~/components/DataCard";

export { loader, action };

export default function RoleId() {
  const { role, users } = useLoaderData<typeof loader>();

  return (
    <div className="p-6 bg-gradient-to-b from-orange-200 to-orange-400 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <span className="text-black font-semibold text-2xl block mb-4">
          Informations sur le rôle
        </span>
        <div className="self-center mb-6">
          <h1 className="text-3xl text-black dark:text-white mb-2">
            {role.name}
          </h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {role.id}
          </span>
        </div>
        <div className="flex justify-center gap-4 my-6">
          <NavLink
            to={`/role/edit/${role.id}`}
            className="bg-yellow-500 rounded flex items-center p-2 h-9 hover:bg-yellow-600 transition text-white"
          >
            <span
              className="icon-[mdi--edit]"
              style={{ width: "20px", height: "20px" }}
            ></span>
          </NavLink>
          <DeleteForm roleId={role.id} />
        </div>
        <span className="text-xl mb-6 text-black dark:text-white block">
          Tous les utilisateurs
        </span>
        {users.length === 0 ? (
          <p className="text-black dark:text-white">
            Aucun utilisateur trouvé.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <DataCard
                key={user.id}
                id={user.id}
                title={`${user.email}`}
                link={`/user/${user.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
