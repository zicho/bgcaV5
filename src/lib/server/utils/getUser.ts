import type { Auth, AuthRequest, User } from "lucia";

export async function getUser(auth: AuthRequest): Promise<User> {
    const user = (await auth.validate())?.user;
    return user!;
}


