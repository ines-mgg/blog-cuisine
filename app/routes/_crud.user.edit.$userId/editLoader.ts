import { LoaderFunctionArgs } from "@remix-run/node";
import { database } from "~/utils/db.server";
import { z } from "zod";
import { User, Role } from "@prisma/client";

export default async function loader({ params }: LoaderFunctionArgs) {
  const userId = z.coerce.string().parse(params.userId);

  const user: User | null = await database.user.findFirst({
    where: { id: userId },
  });

  const roles: Role[] = await database.role.findMany();

  return { user, roles };
}
