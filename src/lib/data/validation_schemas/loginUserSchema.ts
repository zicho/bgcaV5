import { z } from "zod";
import validationRules from "./config/ValidationRules";

export const loginUserSchema = z.object({
    username: z.string().min(validationRules.minUsernameLength),
    password: z.string().min(validationRules.minPasswordLength)
});