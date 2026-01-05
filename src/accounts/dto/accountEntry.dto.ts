import { Direction } from "@/types/direction";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

const CreateAccountSchema = z
  .object({
    id: z.uuid().optional().openapi({ description: "Account id" }),
    name: z
      .string()
      .min(3)
      .max(256)
      .trim()
      .optional()
      .openapi({ description: "Account name", example: "Gustavo" }),
    direction: z.enum(Direction).openapi({
      description: "Account direction (debit or credit)",
      example: "debit",
    }),
  })
  .openapi("Account");

type AccountEntryDto = z.infer<typeof CreateAccountSchema>;

export { CreateAccountSchema };
export type { AccountEntryDto };
