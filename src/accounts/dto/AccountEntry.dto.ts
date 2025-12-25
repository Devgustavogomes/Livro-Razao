import { Direction } from "@/types/direction";
import z from "zod";

const CreateAccountSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(3).max(256).trim().optional(),
  direction: z.enum(Direction),
});

type AccountEntryDto = z.infer<typeof CreateAccountSchema>;

export { CreateAccountSchema };
export type { AccountEntryDto };
