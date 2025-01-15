import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "delete") {
    const userId = z.string().parse(formData.get("userId"));
    await database.user.delete({
      where: { id: userId },
    });
    return redirect("/users");
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
