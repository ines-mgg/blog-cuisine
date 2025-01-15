import { useLoaderData, NavLink } from "@remix-run/react";
import loader from "./getUser";
import action from "./deleteUserAction";
import DeleteForm from "./deleteForm";
import DataCard from "~/components/DataCard";

export { loader, action };

export default function UserId() {
  const { role, user, recipes } = useLoaderData<typeof loader>();

  return (
    <div className="p-6 bg-gradient-to-b from-orange-200 to-orange-400 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <span className="text-black font-semibold text-2xl block mb-4">
          Informations sur l&apos;utilisateur
        </span>
        <div className="self-center mb-6">
          <h1 className="text-3xl text-black dark:text-white mb-2">
            {user.email}
          </h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {user.id}
            <br />
            {role?.name}
          </span>
        </div>
        <div className="flex justify-center gap-4 my-6">
          <NavLink
            to={`/user/edit/${user.id}`}
            className="bg-yellow-500 rounded flex items-center p-2 h-9 hover:bg-yellow-600 transition text-white"
          >
            <span
              className="icon-[mdi--edit]"
              style={{ width: "20px", height: "20px" }}
            ></span>
          </NavLink>
          <DeleteForm userId={user.id} />
        </div>
        <span className="text-xl mb-6 text-black dark:text-white block">
          Tous les recettes
        </span>
        {recipes.length === 0 ? (
          <p className="text-black dark:text-white">
            Aucune recette trouvée
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <DataCard
                key={recipe.id}
                id={recipe.id}
                title={`${recipe.title}`}
                link={`/recipe/${recipe.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
