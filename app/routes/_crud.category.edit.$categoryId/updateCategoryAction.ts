import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "update") {
    const categoryId = z.string().parse(formData.get("categoryId"));
    const name = z.string().parse(formData.get("name"));
    await database.category.update({
      where: { id: categoryId },
      data: { name },
    });
    return redirect(`/category/${categoryId}`);
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
