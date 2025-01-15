import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import { Role, User } from "@prisma/client";

export default async function loader({ params }: LoaderFunctionArgs) {
  const roleId = z.coerce.string().parse(params.roleId);

  try {
    const role: Role | null = await database.role.findFirst({
      where: { id: roleId },
    });

    if (role) {
      const users: User[] = await database.user.findMany({
        where: { roleId: roleId },
      });

      return { role, users };
    } else {
      return redirect("/roles");
    }
  } catch (error) {
    throw new Error("Erreur interne du serveur");
  }
}
