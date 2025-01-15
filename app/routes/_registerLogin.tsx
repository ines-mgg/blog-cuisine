import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";

export default function RegisterLogin() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 to-orange-400 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </>
  );
}
