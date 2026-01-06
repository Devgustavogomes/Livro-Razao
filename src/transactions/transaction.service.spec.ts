import { NotFoundError } from "@/errors/NotFoundError";
import { UnbalancedTransactionError } from "@/errors/UnbalancedTransactionError";
import { Transaction } from "./entities/transaction.entity";
import * as repo from "./transaction.repository";
import {
  createTransactionService,
  findTransactionByIdService,
} from "./transaction.service";
import { Direction } from "@/types/direction";

describe("TransactionService", () => {
  const accountsMock = [
    {
      id: "acc-debit",
      name: "Debit Account",
      balance: 1000,
      direction: Direction.debit,
    },
    {
      id: "acc-credit",
      name: "Credit Account",
      balance: 500,
      direction: Direction.credit,
    },
  ];

  const entriesGood = [
    {
      account_id: "acc-debit",
      direction: Direction.debit,
      amount: 100,
      id: "aa",
    },
    {
      account_id: "acc-credit",
      direction: Direction.credit,
      amount: 100,
      id: "aab",
    },
  ];

  const entriesUnbalanced = [
    { account_id: "acc-debit", direction: Direction.debit, amount: 100 },
    { account_id: "acc-credit", direction: Direction.credit, amount: 50 },
  ];

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("createTransactionService - good path", () => {
    it("should create transaction successfully", async () => {
      const dto = {
        id: "tx-1",
        name: "Test Transaction",
        entries: entriesGood,
      };

      jest.spyOn(repo, "getAllAccounts").mockResolvedValue(accountsMock);
      jest.spyOn(repo, "changeAccounts").mockResolvedValue(undefined);
      jest
        .spyOn(repo, "createTransactionRepository")
        .mockImplementation(async (transaction: Transaction) => transaction);

      const result = await createTransactionService(dto);

      expect(result).toBeInstanceOf(Transaction);
      expect(result.entries).toHaveLength(dto.entries.length);

      expect(repo.createTransactionRepository).toHaveBeenCalledWith(
        expect.any(Transaction)
      );
      expect(repo.createTransactionRepository).toHaveBeenCalledTimes(1);

      const accDebit = accountsMock.find((a) => a.id === "acc-debit")!;
      const accCredit = accountsMock.find((a) => a.id === "acc-credit")!;
      expect(accDebit.balance).toBe(1100);
      expect(accCredit.balance).toBe(600);
    });
  });

  describe("createTransactionService - bad paths", () => {
    it("should throw NotFoundError if account does not exist", async () => {
      const dto = {
        id: "tx-2",
        name: "Test Transaction",
        entries: entriesGood,
      };
      jest.spyOn(repo, "getAllAccounts").mockResolvedValue([]);

      await expect(createTransactionService(dto)).rejects.toBeInstanceOf(
        NotFoundError
      );
    });

    it("should throw UnbalancedTransactionError if transaction is unbalanced", async () => {
      const dto = {
        id: "tx-3",
        name: "Test Transaction",
        entries: entriesUnbalanced,
      };
      jest.spyOn(repo, "getAllAccounts").mockResolvedValue(accountsMock);

      await expect(createTransactionService(dto)).rejects.toBeInstanceOf(
        UnbalancedTransactionError
      );
    });
  });

  describe("findTransactionByIdService", () => {
    it("should return transaction if found", async () => {
      const txMock = { id: "tx-1", name: "Test Tx", entries: entriesGood };
      jest
        .spyOn(repo, "findTransactionByIdRepository")
        .mockResolvedValue(txMock);

      const result = await findTransactionByIdService("tx-1");

      expect(result).toEqual(txMock);
      expect(repo.findTransactionByIdRepository).toHaveBeenCalledWith("tx-1");
    });

    it("should throw NotFoundError if transaction not found", async () => {
      jest
        .spyOn(repo, "findTransactionByIdRepository")
        .mockResolvedValue(undefined);

      await expect(
        findTransactionByIdService("tx-notfound")
      ).rejects.toBeInstanceOf(NotFoundError);
    });
  });
});
