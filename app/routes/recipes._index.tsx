import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { database } from "~/utils/db.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import RecipeCard from "~/components/RecipeCard";
import { getSession } from "~/server/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("cookie"));
  const user = session.get("user");

  const recipes = await database.recipe.findMany({
    include: {
      category: true,
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { user, recipes };
};

export default function Recipes() {
  const { recipes } = useLoaderData<typeof loader>();
  const { user } = useLoaderData<{ user?: { roleName: string } }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">
            <span className="border-b-4 border-[#FF6B35] pb-2">
              Toutes nos recettes
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                Aucune recette disponible
              </div>
            ) : (
              recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  content={recipe.content}
                  category={recipe.category}
                  createdAt={recipe.createdAt.toISOString()}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
