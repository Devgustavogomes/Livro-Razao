import type { Direction } from "@/types/direction";

export type AccountOutputDto = {
  id: string;
  name: string | null;
  balance: number;
  direction: Direction;
};
