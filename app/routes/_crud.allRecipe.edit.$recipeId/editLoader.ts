import { LoaderFunctionArgs } from "@remix-run/node";
import { database } from "~/utils/db.server";
import { z } from "zod";
import { Category, Recipe } from "@prisma/client";

export default async function loader({ params }: LoaderFunctionArgs) {
  const recipeId = z.coerce.string().parse(params.recipeId);

  const recipe: Recipe | null = await database.recipe.findFirst({
    where: { id: recipeId },
  });

  const categories: Category[] = await database.category.findMany();

  return { recipe, categories };
}
