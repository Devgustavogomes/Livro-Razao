import type { AccountEntryDto } from "./dto/AccountEntry.dto";
import { v4 as uuidv4 } from "uuid";
import {
  createAccountRepository,
  getAccountByIdRepository,
} from "./account.repository";
import { NotFoundError } from "@/Errors/NotFoundError";
import type { Account } from "./entities/account.entity";

async function createAccountService(dto: AccountEntryDto): Promise<void> {
  const newAccount = {
    id: dto.id ?? uuidv4(),
    name: dto.name ?? null,
    direction: dto.direction,
    balance: 0,
  };

  await createAccountRepository(newAccount);
}

async function getAccountByIdService(id: string): Promise<Account> {
  const account = await getAccountByIdRepository(id);

  if (!account) {
    throw new NotFoundError("Account doesn't exist");
  }

  return account;
}

export { createAccountService, getAccountByIdService };
