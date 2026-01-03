import { readDB, writeDB } from "@/database/database";
import type { Account } from "./entities/account.entity";
import { AccountOutputDto } from "./dto/accountOutput.dto";

const FILE = "accounts.json";

async function createAccountRepository(data: Account): Promise<Account> {
  await writeDB(FILE, data);

  return data;
}

async function getAccountByIdRepository(
  id: string
): Promise<AccountOutputDto | undefined> {
  const accounts = await readDB<AccountOutputDto>(FILE);

  const account = accounts.find((acc) => acc.id === id);

  return account;
}

export { createAccountRepository, getAccountByIdRepository };
