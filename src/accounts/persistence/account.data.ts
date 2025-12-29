import type { Direction } from "@/types/direction";

export type AccountData = {
  id: string;
  name: string | null;
  balance: number;
  direction: Direction;
};
