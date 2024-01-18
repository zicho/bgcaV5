import { z } from "zod";

export const loginUserSchema = z.object({
    username: z.string().trim(),
    password: z.string().trim(),
});
