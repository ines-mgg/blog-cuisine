import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "update") {
    const recipeId = z.string().parse(formData.get("recipeId"));
    const title = z.string().parse(formData.get("title"));
    const content = z.string().parse(formData.get("content"));
    const categoryId = z.string().parse(formData.get("categoryId"));

    await database.recipe.update({
      where: { id: recipeId },
      data: { title, content, categoryId },
    });

    return redirect(`/allRecipe/${recipeId}`);
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
