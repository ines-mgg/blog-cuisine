import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { database } from "~/utils/db.server";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getSession } from "~/server/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("cookie"));
  const user = session.get("user");

  const recipe = await database.recipe.findUnique({
    where: { id: params.recipeId },
    include: {
      category: true,
      user: {
        select: {
          email: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!recipe) {
    throw new Response("Recette non trouvée", { status: 404 });
  }

  return { user, recipe };
};

export default function RecipeDetail() {
  const { recipe } = useLoaderData<typeof loader>();
  const { user } = useLoaderData<{ user?: { roleName: string } }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />

      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <Link
            to="/recipes"
            className="text-[#FF6B35] hover:underline inline-flex items-center mb-8"
          >
            ← Retour aux recettes
          </Link>

          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-8"></div>

          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>

          <div className="flex items-center text-gray-600 mb-8">
            <span>Par {recipe.user.email}</span>
            <span className="mx-2">•</span>
            <span>{recipe.category.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{recipe.content}</div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
