import { validate } from "@/middlewares/Validate";
import express from "express";
import { TransactionSchema } from "./dto/transactionEntry.dto";
import { createTransactionController } from "./transaction.controller";

const transactionsRoute = express.Router();

transactionsRoute.post(
  "/",
  validate(TransactionSchema, "body"),
  createTransactionController
);

export default transactionsRoute;
