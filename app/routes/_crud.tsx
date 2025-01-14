import { Outlet } from "@remix-run/react";
import DashboardHeader from "~/components/dashboardHeader";

export default function Crud() {
  const navLinks = [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/roles", label: "Tous les rôles" },
    { link: "/categories", label: "Tous les catégories" },
    { link: "/users", label: "Tous les utilisateurs" },
    { link: "/recipes", label: "Tous les recettes" },
  ];
  return (
    <>
      <DashboardHeader navLinks={navLinks} />
      <main className="flex flex-col pt-28 pl-10">
        <Outlet />
      </main>
    </>
  );
}
