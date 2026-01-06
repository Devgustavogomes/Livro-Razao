import { validate } from "@/middlewares/Validate";
import express from "express";
import { TransactionSchema } from "./dto/transactionEntry.dto";
import { createTransactionController } from "./transaction.controller";
import { DocumentPath } from "@/config/utils/swagger.utils";
import { TransactionOutputSchema } from "./dto/transactionOutput.dto";
import { httpStatus } from "@/config/constants/HttpStatus";

const transactionsRoute = express.Router();

DocumentPath({
  method: "post",
  description: "Create transaction",
  summary: "Route to create and execute a transaction",
  path: "/transaction",
  tags: ["Transaction"],
  request: { body: TransactionSchema },
  responses: {
    [httpStatus.Created]: {
      desc: "Created and executed",
      schema: TransactionOutputSchema,
    },
    [httpStatus.NotFound]: { desc: "Account not found" },
    [httpStatus.BadRequest]: { desc: "Transaction is not balanced" },
  },
});

transactionsRoute.post(
  "/",
  validate(TransactionSchema, "body"),
  createTransactionController
);

export default transactionsRoute;
