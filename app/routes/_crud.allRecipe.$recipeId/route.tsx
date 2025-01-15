import { useLoaderData, NavLink } from "@remix-run/react";
import loader from "./getRecipe";
import action from "./deleteRecipeAction";
import DeleteForm from "./deleteForm";;

export { loader, action };

export default function RoleId() {
  const { user, recipe, category } = useLoaderData<typeof loader>();

  return (
    <div className="p-6 bg-gradient-to-b from-orange-200 to-orange-400 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <span className="text-black font-semibold text-2xl block mb-4">
          Informations sur la recette
        </span>
        <div className="self-center mb-6">
          <h1 className="text-3xl text-black dark:text-white mb-2">
            {recipe.title} - par {user?.email}
          </h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {category?.name}
          </span>
          <br />
          <span>{recipe.content}</span>
        </div>
        <div className="flex justify-center gap-4 my-6">
          <NavLink
            to={`/allRecipe/edit/${recipe.id}`}
            className="bg-yellow-500 rounded flex items-center p-2 h-9 hover:bg-yellow-600 transition text-white"
          >
            <span
              className="icon-[mdi--edit]"
              style={{ width: "20px", height: "20px" }}
            ></span>
          </NavLink>
          <DeleteForm recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
}
