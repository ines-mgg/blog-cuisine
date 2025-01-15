import { LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { database } from "~/utils/db.server";
import { Category } from "@prisma/client";

export default async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const page = z.coerce.number().parse(url.searchParams.get("page") ?? "1");
  const query = z.string().nullable().parse(url.searchParams.get("query"));

  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  try {
    const categories: Category[] = await database.category.findMany({
      where: query ? { name: { contains: query } } : {},
      skip: offset,
      take: pageSize,
    });

    const totalCategories = await database.category.count({
      where: query ? { name: { contains: query } } : {},
    });

    const lastPage = Math.ceil(totalCategories / pageSize);

    return { categories, page, query, lastPage };
  } catch (error) {
    throw new Error("Erreur interne du serveur");
  }
}
