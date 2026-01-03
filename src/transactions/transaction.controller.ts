import { Request, Response } from "express";
import { createTransactionService } from "./transaction.service";
import { httpStatus } from "@/config/constants/HttpStatus";

async function createTransactionController(req: Request, res: Response) {
  const transaction = await createTransactionService(req.body);

  return res.status(httpStatus.Created).json(transaction);
}

export { createTransactionController };
