import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "create") {
    const name = z.string().parse(formData.get("name"));
    await database.category.create({
      data: { name },
    });
    return redirect("/categories");
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
