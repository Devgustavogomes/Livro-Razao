import { Result } from "./../../node_modules/glob/dist/commonjs/glob.d";
import { Direction } from "@/types/direction";
import { Account } from "./entities/account.entity";
import { AccountEntryDto } from "./dto/accountEntry.dto";
import * as repo from "./account.repository";
import { createAccountService, getAccountByIdService } from "./account.service";
import { NotFoundError } from "@/errors/NotFoundError";

describe("Account service good path", () => {
  test("Create account successfull", async () => {
    const dto = {
      name: "TestAccount",
      direction: Direction.credit,
    } as AccountEntryDto;

    const accountMock = new Account(dto.id, dto.name, dto.direction);

    jest.spyOn(repo, "createAccountRepository").mockResolvedValue(accountMock);

    const result = await createAccountService(dto);

    expect(repo.createAccountRepository).toHaveBeenCalledWith(
      expect.any(Account)
    );
    expect(result).toEqual(accountMock);
  });

  test("Find account by id succesfull", async () => {
    const id = "71cde2aa-b9bc-496a-a6f1-34964d05e6fd";

    const accountMock = {
      id: "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
      name: "test3",
      balance: 3600,
      direction: Direction.debit,
    };

    jest.spyOn(repo, "getAccountByIdRepository").mockResolvedValue(accountMock);

    const result = await getAccountByIdService(id);

    expect(repo.getAccountByIdRepository).toHaveBeenCalledWith(id);

    expect(result).toEqual(accountMock);
  });
});

describe("Account service bad path", () => {
  test("Find account by id unsuccessfull", async () => {
    const id = "71cde2aa-b9bc-496a-a6f1-34964d05e6fd";

    jest.spyOn(repo, "getAccountByIdRepository").mockResolvedValue(undefined);

    await expect(getAccountByIdService(id)).rejects.toBeInstanceOf(
      NotFoundError
    );

    expect(repo.getAccountByIdRepository).toHaveBeenCalledWith(id);
  });
});
