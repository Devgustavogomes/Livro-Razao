import { NotFoundError } from "@/errors/NotFoundError";
import { Entries, TransactionEntryDto } from "./dto/transactionEntry.dto";
import { Transaction } from "./entities/transaction.entity";
import {
  changeAccounts,
  createTransactionRepository,
  getAllAccounts,
} from "./transaction.repository";
import { Direction } from "@/types/direction";
import { UnbalancedTransactionError } from "@/errors/UnbalancedTransactionError";
import { Entry } from "./entities/entry.entity";

async function createTransactionService(
  dto: TransactionEntryDto
): Promise<Transaction> {
  await checkAccountsExist(dto.entries);

  checkBalance(dto.entries);

  const transaction = new Transaction(dto.id, dto.name);

  await executeEntries(dto.entries, transaction);

  return await createTransactionRepository(transaction);
}

async function executeEntries(
  entries: Entries[],
  transaction: Transaction
): Promise<void> {
  const accounts = await getAllAccounts();

  const accountsMap = new Map(accounts.map((acc) => [acc.id, acc]));

  for (const entry of entries) {
    const formatEntry = new Entry(entry);
    const acc = accountsMap.get(formatEntry.account_id);

    acc!.balance =
      formatEntry.direction === acc!.direction
        ? Transaction.add(acc!.balance, formatEntry.amount)
        : Transaction.sub(acc!.balance, formatEntry.amount);

    transaction.entries.push(formatEntry);
  }

  await changeAccounts(accounts);
}

async function checkAccountsExist(entries: Entries[]): Promise<void> {
  const accounts = await getAllAccounts();

  if (!accounts || accounts.length === 0) {
    throw new NotFoundError(`No accounts found`);
  }

  const accountsSet = new Set<string>(accounts.map((acc) => acc.id));

  for (const entry of entries) {
    if (!accountsSet.has(entry.account_id)) {
      throw new NotFoundError(
        `Account with id ${entry.account_id} does not exist`
      );
    }
  }
}

function checkBalance(entries: Entries[]): void {
  const balanceMap = new Map<Direction, number>();

  for (const entry of entries) {
    const prev = balanceMap.get(entry.direction) || 0;

    balanceMap.set(entry.direction, prev + entry.amount);
  }

  if (balanceMap.get(Direction.debit) !== balanceMap.get(Direction.credit)) {
    throw new UnbalancedTransactionError("Transaction is not balanced");
  }
}

export { createTransactionService };
