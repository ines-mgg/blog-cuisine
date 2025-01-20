import { database } from "~/utils/db.server";
import type { User } from "@Prisma/client";

let cachedRoles: string[] | null = null;

export async function hasRole(user: User & { role: { name: string } }, requiredRole: string): Promise<boolean> {
    if (!cachedRoles) {
        const roles = await database.role.findMany({
        orderBy: { id: "asc" },
        });
        cachedRoles = roles.map((role) => role.name);
    }

    const userRoleIndex = cachedRoles.indexOf(user.role.name);
    const requiredRoleIndex = cachedRoles.indexOf(requiredRole);

    if (userRoleIndex === -1 || requiredRoleIndex === -1) {
        return false;
    }

    return userRoleIndex >= requiredRoleIndex;
}
