import type { AccountEntryDto } from "./dto/AccountEntry.dto";
import {
  createAccountRepository,
  getAccountByIdRepository,
} from "./account.repository";
import { NotFoundError } from "@/errors/NotFoundError";
import { Account } from "./entities/account.entity";

async function createAccountService(dto: AccountEntryDto): Promise<Account> {
  const newAccount = new Account(dto.id, dto.name, dto.direction);

  return await createAccountRepository(newAccount);
}

async function getAccountByIdService(id: string): Promise<Account> {
  const account = await getAccountByIdRepository(id);

  if (!account) {
    throw new NotFoundError("Account doesn't exist");
  }

  return account;
}

export { createAccountService, getAccountByIdService };
