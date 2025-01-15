import { LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import { Recipe } from "@prisma/client";

export default async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const page = z.coerce.number().parse(url.searchParams.get("page") ?? "1");
  const query = z.string().nullable().parse(url.searchParams.get("query"));

  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  try {
    const recipes: Recipe[] = await database.recipe.findMany({
      where: query ? { title: { contains: query } } : {},
      skip: offset,
      take: pageSize,
    });

    const totalRoles = await database.recipe.count({
      where: query ? { title: { contains: query } } : {},
    });

    const lastPage = Math.ceil(totalRoles / pageSize);

    return { recipes, page, query, lastPage };
  } catch (error) {
    throw new Error("Erreur interne du serveur");
  }
}
