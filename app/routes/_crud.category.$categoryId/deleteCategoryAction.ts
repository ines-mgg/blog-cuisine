import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "delete") {
    const categoryId = z.string().parse(formData.get("categoryId"));
    await database.category.delete({
      where: { id: categoryId },
    });
    return redirect("/categories");
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
