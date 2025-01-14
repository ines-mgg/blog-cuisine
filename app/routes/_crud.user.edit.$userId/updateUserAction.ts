import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export default async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (formData.get("intent") === "update") {
    const userId = z.string().parse(formData.get("userId"));
    const email = z.string().email().parse(formData.get("email"));
    const password = z.string().optional().parse(formData.get("password"));
    const roleId = z.string().parse(formData.get("roleId"));

    const updateData: Partial<User> = { email, roleId };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    await database.user.update({
      where: { id: userId },
      data: updateData,
    });

    return redirect(`/user/${userId}`);
  }
  throw new Error(`Invalid intent: ${formData.get("intent") ?? "Missing"}`);
}
