import { v4 as uuidv4 } from "uuid";
import { Entries } from "../dto/transactionEntry.dto";

export class Transaction {
  private id;
  private name: string | null;
  public entries: Entries[] = [];

  constructor(id: string | undefined, name: string | undefined) {
    this.id = id ?? uuidv4();
    this.name = name ?? null;
  }

  static add(accAmount: number, entryAmount: number): number {
    const accAmountCents = Math.round(accAmount * 100);
    const entryAmountCents = Math.round(entryAmount * 100);

    return (accAmountCents + entryAmountCents) / 100;
  }

  static sub(accAmount: number, entryAmount: number): number {
    const accAmountCents = Math.round(accAmount * 100);
    const entryAmountCents = Math.round(entryAmount * 100);

    return (accAmountCents - entryAmountCents) / 100;
  }
}
