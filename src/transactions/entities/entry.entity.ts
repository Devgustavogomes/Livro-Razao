import { Direction } from "@/types/direction";
import { v4 as uuidv4 } from "uuid";
export class Entry {
  public direction: Direction;
  public account_id: string;
  public amount: number;
  private id: string;

  constructor({ direction, account_id, amount }: Omit<Entry, "id">) {
    this.direction = direction;
    this.account_id = account_id;
    this.amount = amount;
    this.id = uuidv4();
  }
}
