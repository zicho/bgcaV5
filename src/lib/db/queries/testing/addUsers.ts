import { auth } from "$lib/server/lucia";
import { generateRandomString } from "lucia/utils";
import generateTestUsername from "../../../../../tests/test_utils/generateTestUsername";

export async function addUsers() {
    for (let i = 0; i < 10; i++) {
        const username = generateTestUsername();
        const password = "password";

        await auth.createUser({
            userId: generateRandomString(15),
            key: {
                providerId: "username", // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password, // hashed by Lucia
            },
            attributes: {
                username,
            },
        });
    }
}