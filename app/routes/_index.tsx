import { Link, useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { LoaderFunction } from "@remix-run/node";
import { getSession } from "~/server/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const user = session.get("user");
  return { user };
};

export default function Index() {
  const { user } = useLoaderData<{ user?: { roleName: string } }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">
              L'incroyable slogan de Cookr
            </h1>

            <p className="text-lg mb-8">
              Découvrez nos meilleures recettes et partagez vos créations
              culinaires !
            </p>

            <Link
              to="/recipes"
              className="inline-block bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#e55a2b] transition"
            >
              Voir toutes les recettes
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
