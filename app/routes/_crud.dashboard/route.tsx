import DataCard from "~/components/DataCard";
import { NavLink, useLoaderData } from "@remix-run/react";
import dashboardLoader from "./dashboardLoader";
import { requireAuthentication } from "~/server/auth.server";
import { hasRole } from "~/utils/authorization";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuthentication(request);

  const isAuthorized = await hasRole(user, "Admin");
  if (!isAuthorized) {
    throw new Response("Accès interdit", { status: 403 });
  }

  return dashboardLoader();
};

export default function Dashboard() {
  const { latestRoles, latestCategories, latestRecipes, latestUsers } =
    useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-black font-semibold text-2xl">
          Les derniers rôles
        </span>
        <div className="flex justify-between px-10">
          {latestRoles.map((role) => (
            <DataCard
              key={role.id}
              id={role.id}
              title={role.name}
              link={`/role/${role.id}`}
            />
          ))}
        </div>
        <NavLink
          to={"/role/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold self-end"
        >
          Créer un rôle
        </NavLink>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-black font-semibold text-2xl">
          Les dernières catégories
        </span>
        <div className="flex justify-between px-10">
          {latestCategories.map((category) => (
            <DataCard
              key={category.id}
              id={category.id}
              title={category.name}
              link={`/category/${category.id}`}
            />
          ))}
        </div>
        <NavLink
          to={"/category/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold self-end"
        >
          Créer une catégorie
        </NavLink>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-black font-semibold text-2xl">
          Les derniers utilisateurs
        </span>
        <div className="flex justify-between px-10">
          {latestUsers.map((user) => (
            <DataCard
              key={user.id}
              id={user.id}
              title={user.email}
              link={`/user/${user.id}`}
            />
          ))}
        </div>
        <NavLink
          to={"/user/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold self-end"
        >
          Créer un utilisateur
        </NavLink>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-black font-semibold text-2xl">
          Les dernières recettes
        </span>
        <div className="flex justify-between px-10">
          {latestRecipes.map((recipe) => (
            <DataCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              link={`/allRecipe/${recipe.id}`}
            />
          ))}
        </div>
        <NavLink
          to={"/allRecipe/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold self-end"
        >
          Créer une recette
        </NavLink>
      </div>
    </>
  );
}
