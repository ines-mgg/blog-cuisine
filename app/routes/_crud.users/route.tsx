import { useLoaderData, NavLink } from "@remix-run/react";
import loader from "./getAllUsers";
import SearchForm from "~/components/SearchForm";
import Paginate from "~/components/Paginate";
import DataCard from "~/components/DataCard";

export { loader };
export default function Users() {
  const { users, query, page, lastPage } = useLoaderData<typeof loader>();
  return (
    <>
      <span className="text-black font-semibold text-2xl">
        Toutes les utilisateurs
      </span>
      <div className="flex justify-between items-center">
        <SearchForm
          query={query}
          title="Rechercher un utilisateur"
        />
        <NavLink
          to={"/user/new"}
          className="mr-4 px-5 py-2 bg-[#FF6B35] text-white rounded text-sm font-bold"
        >
          Créer un utilisateur
        </NavLink>
      </div>
      <div className="my-4 grid grid-cols-4 gap-4">
        {users.map((user) => (
          <DataCard
            key={user.id}
            id={user.id}
            title={user.email}
            link={`/user/${user.id}`}
          />
        ))}
      </div>
      <Paginate lastPage={lastPage} page={page} />
    </>
  );
}
