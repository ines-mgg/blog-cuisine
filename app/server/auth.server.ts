import { getSession } from "~/server/session.server";
import type { User } from "@Prisma/client";
import { database } from "~/utils/db.server";

export async function isAuthenticated(request: Request): Promise<User | null> {
    const session = await getSession(request.headers.get("cookie"));
    const userId = session.get("user")?.id;

    if (!userId) {
        return null;
    }

    const user = await database.user.findUnique({
        where: { id: userId },
        include: { role: true },
    });

    return user || null;
}

export async function requireAuthentication(
    request: Request,
    failureRedirect: string = "/login"
): Promise<User> {
    const user = await isAuthenticated(request);

    if (!user) {
        throw new Response("Non authentifié", { status: 302, headers: { Location: failureRedirect } });
    }

    return user;
}
