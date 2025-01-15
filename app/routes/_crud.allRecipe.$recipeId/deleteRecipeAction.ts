import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "delete") {
    const recipeId = z.string().parse(formData.get("recipeId"));
    await database.recipe.delete({
      where: { id: recipeId },
    });
    return redirect("/allRecipes");
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
