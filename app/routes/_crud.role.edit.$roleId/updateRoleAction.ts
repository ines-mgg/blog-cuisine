import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "update") {
    const roleId = z.string().parse(formData.get("roleId"));
    const name = z.string().parse(formData.get("name"));
    await database.role.update({
      where: { id: roleId },
      data: { name },
    });
    return redirect(`/role/${roleId}`);
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
