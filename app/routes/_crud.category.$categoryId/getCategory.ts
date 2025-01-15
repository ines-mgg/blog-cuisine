import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import { Category, Recipe } from "@prisma/client";

export default async function loader({ params }: LoaderFunctionArgs) {
  const categoryId = z.coerce.string().parse(params.categoryId);

  try {
    const category: Category | null = await database.category.findFirst({
      where: { id: categoryId },
    });

    if (category) {
      const recipes: Recipe[] = await database.recipe.findMany({
        where: { categoryId: categoryId },
      });

      return { category, recipes };
    } else {
      return redirect("/categories");
    }
  } catch (error) {
    throw new Error("Erreur interne du serveur");
  }
}
