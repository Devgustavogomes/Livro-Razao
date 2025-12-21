import type { Direction } from "@/types/direction";

export type Account = {
  id: string;
  name?: string;
  balance: number;
  direction: Direction;
};
