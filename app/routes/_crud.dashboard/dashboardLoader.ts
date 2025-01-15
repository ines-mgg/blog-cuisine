import { database } from "~/utils/db.server";
import { Role, Category, User, Recipe } from "@prisma/client";

export default async function loader() {
  const latestRoles: Role[] = await database.role.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const latestCategories: Category[] = await database.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const latestUsers: User[] = await database.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const latestRecipes: Recipe[] = await database.recipe.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return { latestRoles, latestCategories, latestUsers, latestRecipes };
}
