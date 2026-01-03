import type { AccountEntryDto } from "./dto/accountEntry.dto";
import {
  createAccountRepository,
  getAccountByIdRepository,
} from "./account.repository";
import { NotFoundError } from "@/errors/NotFoundError";
import { Account } from "./entities/account.entity";
import { AccountOutputDto } from "./dto/accountOutput.dto";

async function createAccountService(dto: AccountEntryDto): Promise<Account> {
  const newAccount = new Account(dto.id, dto.name, dto.direction);

  return await createAccountRepository(newAccount);
}

async function getAccountByIdService(id: string): Promise<AccountOutputDto> {
  const account = await getAccountByIdRepository(id);

  if (!account) {
    throw new NotFoundError("Account doesn't exist");
  }

  return account;
}

export { createAccountService, getAccountByIdService };
