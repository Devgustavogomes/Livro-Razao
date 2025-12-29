import { Direction } from "@/types/direction";
import { v4 as uuidv4 } from "uuid";
import { Entries } from "../dto/transaction.dto";

export class Transaction {
  private id;
  private name: string | null;
  private entries: Entries[] = [];

  constructor(id: string | undefined, name: string | undefined) {
    this.id = id ?? uuidv4();
    this.name = name ?? null;
  }
}
