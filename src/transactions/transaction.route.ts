import { validate } from "@/middlewares/Validate";
import express from "express";
import { TransactionSchema } from "./dto/transactionEntry.dto";
import { createTransactionController } from "./transaction.controller";
import { DocumentPath } from "@/config/utils/swagger.utils";
import { TransactionOutputSchema } from "./dto/transactionOutput.dto";

const transactionsRoute = express.Router();

DocumentPath({
  method: "post",
  description: "Create transaction",
  summary: "Route to create and execute a transaction",
  path: "/transaction",
  tags: ["Transaction"],
  request: { body: TransactionSchema },
  responses: {
    200: { desc: "Created and executed", schema: TransactionOutputSchema },
    404: { desc: "Account not found" },
    400: { desc: "Transaction is not balanced" },
  },
});

transactionsRoute.post(
  "/",
  validate(TransactionSchema, "body"),
  createTransactionController
);

export default transactionsRoute;
