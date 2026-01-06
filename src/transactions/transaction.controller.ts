import { Request, Response } from "express";
import {
  createTransactionService,
  findTransactionByIdService,
} from "./transaction.service";
import { httpStatus } from "@/config/constants/HttpStatus";

async function createTransactionController(req: Request, res: Response) {
  const transaction = await createTransactionService(req.body);

  return res.status(httpStatus.Created).json(transaction);
}

async function findTransactionByIdController(req: Request, res: Response) {
  const transaction = await findTransactionByIdService(req.params.id);

  return res.status(httpStatus.OK).json(transaction);
}

export { createTransactionController, findTransactionByIdController };
