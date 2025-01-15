import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import { User, Recipe, Category } from "@prisma/client";

export default async function loader({ params }: LoaderFunctionArgs) {
  const recipeId = z.coerce.string().parse(params.recipeId);

  try {
    const recipe: Recipe | null = await database.recipe.findFirst({
      where: { id: recipeId },
    });

    if (recipe) {
      const user: User | null = await database.user.findFirst({
        where: { id: recipe.userId },
      });

      const category: Category | null = await database.category.findFirst({
        where: { id: recipe.categoryId },
      });

      return { user, recipe, category };
    } else {
      return redirect("/allRecipes");
    }
  } catch (error) {
    throw new Error("Erreur interne du serveur");
  }
}
