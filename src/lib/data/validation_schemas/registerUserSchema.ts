import { z } from "zod";

const registerUserSchema = z
    .object({
        username: z
            .string()
            .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid username." })
            .min(3, { message: "Minimum 3 characters" })
            .max(25, { message: "Max 25 characters" })
            .trim(),
        password: z.string().min(3, { message: "Password must be minimum 3 characters" }),
        confirm_password: z.string().min(3, { message: "Password must be minimum 3 characters" }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm"]
    });

export default registerUserSchema;
