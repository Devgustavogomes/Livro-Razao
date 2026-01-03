import { TransactionEntryDto } from "./transactionEntry.dto";

export type TransactionOutputDto = {
  id: string;
  name: string;
  entries: (Required<TransactionEntryDto["entries"][number]> & {
    id: string;
  })[];
};
