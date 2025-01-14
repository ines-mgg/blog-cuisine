import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import bcrypt from "bcrypt";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "create") {
    const email = z.string().email().parse(formData.get("email"));
    const password = z.string().parse(formData.get("password"));
    const roleId = z.string().parse(formData.get("roleId"));
    const hashedPassword = await bcrypt.hash(password, 10);

    await database.user.create({
      data: { email, password: hashedPassword, roleId },
    });
    return redirect("/users");
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
