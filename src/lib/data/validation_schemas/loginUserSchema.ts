import { z } from "zod";
import validationRules from "./config/ValidationRules";
import formatString from "$lib/utils/formatString";
import { MaxCharactersF, MinCharactersF } from "../strings/ValidationMessages";

export const loginUserSchema = z.object({
    username: z.string(),
    //     .min(
    //         validationRules.minUsernameLength, {
    //         message: formatString(MinCharactersF, validationRules.minUsernameLength)
    //     })
    //     .max(
    //         validationRules.maxUsernameLength, {
    //         message: formatString(MaxCharactersF, validationRules.maxPasswordLength)
    //     })
    //     .trim(),
    password: z.string()
    //     .min(
    //         validationRules.minPasswordLength, {
    //         message: formatString(MinCharactersF, validationRules.minPasswordLength)
    //     })
    //     .max(
    //         validationRules.maxPasswordLength, {
    //         message: formatString(MaxCharactersF, validationRules.maxPasswordLength)
    //     }),
});