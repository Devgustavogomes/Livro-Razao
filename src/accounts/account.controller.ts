import type { Request, Response } from "express";
import { createAccountService, getAccountByIdService } from "./account.service";
import { httpStatus } from "@/config/constants/HttpStatus";

async function createAccountController(req: Request, res: Response) {
  await createAccountService(req.body);

  return res.status(httpStatus.Created).json({ message: "Account Created" });
}

async function getAccountByIdController(req: Request, res: Response) {
  const account = await getAccountByIdService(req.params.id);

  return res.status(httpStatus.OK).json(account);
}

export { createAccountController, getAccountByIdController };
