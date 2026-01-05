import z from "zod";
import { EntriesSchema, TransactionSchema } from "./transactionEntry.dto";

const EntriesOutputSchema = EntriesSchema.extend({
  id: z.uuid(),
});

const TransactionOutputSchema = TransactionSchema.extend({
  id: z.uuid(),
  name: z.string().min(3).max(256).nullable(),
  entries: z.array(EntriesOutputSchema),
}).openapi("TransactionOutput");

export type TransactionOutputDto = z.infer<typeof TransactionOutputSchema>;
export { EntriesOutputSchema, TransactionOutputSchema };
