import { z } from "zod";
import validationRules from "./config/ValidationRules";
import { MaxCharactersF, MinCharactersF } from "../strings/ValidationMessages";
import formatString from "$lib/utils/formatString";

const registerUserSchema = z
    .object({
        username: z
            .string()
            .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid username." })
            .min(
                validationRules.minUsernameLength, {
                message: formatString(MinCharactersF, validationRules.minUsernameLength)
            })
            .max(
                validationRules.maxUsernameLength, {
                message: formatString(MaxCharactersF, validationRules.maxPasswordLength)
            })
            .trim(),
        password: z.string()
            .min(
                validationRules.minPasswordLength, {
                message: formatString(MinCharactersF, validationRules.minPasswordLength)
            })
            .max(
                validationRules.maxPasswordLength, {
                message: formatString(MaxCharactersF, validationRules.maxPasswordLength)
            })
            .trim(),
        confirm_password: z.string()
            .min(
                validationRules.minPasswordLength, {
                message: formatString(MinCharactersF, validationRules.minPasswordLength)
            })
            .max(
                validationRules.maxPasswordLength, {
                message: formatString(MaxCharactersF, validationRules.maxPasswordLength)
            })
            .trim(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm"]
    });

export default registerUserSchema;
