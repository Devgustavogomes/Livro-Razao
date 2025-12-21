import type { AccountEntryDto } from "./dto/accountEntry.dto";
import { v7 as uuidv7 } from "uuid";
import { createAccountRepository } from "./account.repository";

function createAccountService(dto: AccountEntryDto) {
  const parseData = {
    id: dto.id ?? uuidv7(),
    name: dto.name,
    direction: dto.direction,
    balance: 0,
  };

  createAccountRepository(parseData);
}

export { createAccountService };
