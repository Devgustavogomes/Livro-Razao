import { z } from "zod";
import { CreateAccountSchema } from "./accountEntry.dto";

export const AccountOutputSchema = CreateAccountSchema.extend({
  id: z.uuid(),
  name: z.string().nullable(),
  balance: z.number().openapi({ example: 1000 }),
}).openapi("AccountOutput");

export type AccountOutputDto = z.infer<typeof AccountOutputSchema>;
