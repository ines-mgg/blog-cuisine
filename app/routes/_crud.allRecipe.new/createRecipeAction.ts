import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import { getSession } from "~/server/session.server";

export default async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  if (!session.has("user")) {
    throw new Error("Session inconnu");
  }
  const userId = session.get("user").id;
  const user = await database.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const formData = await request.formData();

  if (formData.get("intent") === "create") {
    const title = z.string().parse(formData.get("title"));
    const content = z.string().parse(formData.get("content"));
    const categoryId = z.string().parse(formData.get("categoryId"));
    await database.recipe.create({
      data: { title, content, userId: user?.id, categoryId },
    });
    return redirect("/allRecipes");
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
