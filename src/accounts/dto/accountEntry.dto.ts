import { Direction } from "@/types/direction";
import z from "zod";

const accountSchema = z.object({
  id: z.uuidv7().optional(),
  name: z.string().min(3).max(256).optional(),
  direction: z.enum(Direction),
});

type AccountEntryDto = z.infer<typeof accountSchema>;

export { accountSchema };
export type { AccountEntryDto };
