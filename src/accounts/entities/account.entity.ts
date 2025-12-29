import type { Direction } from "@/types/direction";
import { v4 as uuidv4 } from "uuid";
export class Account {
  public id: string;
  private name: string | null;
  private balance: number;
  private direction: Direction;

  constructor(
    id: string | undefined,
    name: string | undefined,
    direction: Direction
  ) {
    this.id = id ?? uuidv4();
    this.name = name ?? null;
    this.balance = 0;
    this.direction = direction;
  }
}
