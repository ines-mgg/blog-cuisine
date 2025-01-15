import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import { Role, User, Recipe } from "@prisma/client";

export default async function loader({ params }: LoaderFunctionArgs) {
  const userId = z.coerce.string().parse(params.userId);

  try {
    const user: User | null = await database.user.findFirst({
      where: { id: userId },
    });

    if (user) {
      const role: Role | null = await database.role.findFirst({
        where: { id: user.roleId },
      });

      const recipes: Recipe[] = await database.recipe.findMany({
        where: { userId: user.id },
      });

      return { role, user, recipes };
    } else {
      return redirect("/users");
    }
  } catch (error) {
    throw new Error("Erreur interne du serveur");
  }
}
