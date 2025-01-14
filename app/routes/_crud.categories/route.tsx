import { useLoaderData, NavLink } from "@remix-run/react";
import loader from "./getAllCategories";
import SearchForm from "~/components/SearchForm";
import Paginate from "~/components/Paginate";
import DataCard from "~/components/DataCard";

export { loader };
export default function Roles() {
  const { categories, query, page, lastPage } = useLoaderData<typeof loader>();
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Toutes les catégories
      </span>
      <div className="flex justify-between items-center">
        <SearchForm
          query={query}
          title="Rechercher une catégorie"
          placeholder="Dessert, Plat..."
        />
        <NavLink
          to={"/category/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold"
        >
          Créer une catégorie
        </NavLink>
      </div>
      <div className="my-4 grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <DataCard
            key={category.id}
            id={category.id}
            title={category.name}
            link={`/category/${category.id}`}
          />
        ))}
      </div>
      <Paginate lastPage={lastPage} page={page} />
    </>
  );
}
