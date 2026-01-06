import { AccountOutputDto } from "@/accounts/dto/accountOutput.dto";
import { readDB, writeDB } from "@/database/database";
import { Transaction } from "./entities/transaction.entity";
import { TransactionOutputDto } from "./dto/transactionOutput.dto";

async function createTransactionRepository(
  data: Transaction
): Promise<Transaction> {
  const FILE = "transactions.json";

  await writeDB(FILE, data);

  return data;
}

async function findTransactionByIdRepository(
  id: string
): Promise<TransactionOutputDto | undefined> {
  const FILE = "transactions.json";

  const accounts = await readDB<TransactionOutputDto>(FILE);

  return accounts.find((acc) => acc.id === id);
}

async function getAllAccounts(): Promise<AccountOutputDto[]> {
  const FILE = "accounts.json";

  return await readDB<AccountOutputDto>(FILE);
}

async function changeAccounts(accounts: AccountOutputDto[]): Promise<void> {
  const FILE = "accounts.json";

  await writeDB(FILE, accounts);
}

export {
  getAllAccounts,
  changeAccounts,
  createTransactionRepository,
  findTransactionByIdRepository,
};
