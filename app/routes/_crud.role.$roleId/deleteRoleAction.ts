import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "delete") {
    const roleId = z.string().parse(formData.get("roleId"));
    await database.role.delete({
      where: { id: roleId },
    });
    return redirect("/roles");
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
