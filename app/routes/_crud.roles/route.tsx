import { useLoaderData, NavLink } from "@remix-run/react";
import loader from "./getAllRoles";
import SearchForm from "~/components/SearchForm";
import Paginate from "~/components/Paginate";
import DataCard from "~/components/DataCard";

export { loader };
export default function Roles() {
  const { roles, query, page, lastPage } = useLoaderData<typeof loader>();
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Toutes les rôles
      </span>
      <div className="flex justify-between items-center">
        <SearchForm
          query={query}
          title="Rechercher un rôle"
          placeholder="Admin, User..."
        />
        <NavLink
          to={"/role/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold"
        >
          Créer un rôle
        </NavLink>
      </div>
      <div className="my-4 grid grid-cols-4 gap-4">
        {roles.map((role) => (
          <DataCard
            key={role.id}
            id={role.id}
            title={role.name}
            link={`/role/${role.id}`}
          />
        ))}
      </div>
      <Paginate lastPage={lastPage} page={page} />
    </>
  );
}
