import { z } from "zod";

export const loginUserSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(3)
});