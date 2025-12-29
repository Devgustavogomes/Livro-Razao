import { Direction } from "@/types/direction";
import z from "zod";

const EntriesSchema = z.object({
  direction: z.enum(Direction),
  account_id: z.uuid(),
  amount: z.number(),
});

export type Entries = z.infer<typeof EntriesSchema>;

const TransactionSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(3).max(256).optional(),
  entries: z.array(EntriesSchema),
});

export default TransactionSchema;
