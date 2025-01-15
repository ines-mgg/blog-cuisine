import { database } from "~/utils/db.server";

export default async function loader() {
  return await database.category.findMany();
}
