import { z } from "zod";

export const importCollectionSchema = z.object({
    "bgg-username-input": z.string().trim().min(1, { message: "Must be 1 or more characters long" }),
});