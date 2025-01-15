import { useLoaderData, NavLink } from "@remix-run/react";
import loader from "./getAllRecipes";
import SearchForm from "~/components/SearchForm";
import Paginate from "~/components/Paginate";
import DataCard from "~/components/DataCard";

export { loader };
export default function AllRecipes() {
  const { recipes, query, page, lastPage } = useLoaderData<typeof loader>();
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Toutes les recettes
      </span>
      <div className="flex justify-between items-center">
        <SearchForm query={query} title="Rechercher une recette" />
        <NavLink
          to={"/allRecipe/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold"
        >
          Créer une recette
        </NavLink>
      </div>
      <div className="my-4 grid grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <DataCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            link={`/allRecipe/${recipe.id}`}
          />
        ))}
      </div>
      <Paginate lastPage={lastPage} page={page} />
    </>
  );
}
