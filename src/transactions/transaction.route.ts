import { validate } from "@/middlewares/Validate";
import express from "express";
import { TransactionSchema } from "./dto/transactionEntry.dto";
import {
  createTransactionController,
  findTransactionByIdController,
} from "./transaction.controller";
import { DocumentPath } from "@/config/utils/swagger.utils";
import { TransactionOutputSchema } from "./dto/transactionOutput.dto";
import { httpStatus } from "@/config/constants/HttpStatus";
import { IdParamsSchema } from "@/types/IdParams";

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

DocumentPath({
  method: "get",
  description: "Find transaction",
  summary: "Find a transaction by id",
  path: "/transactions/{id}",
  tags: ["Transaction"],
  request: { params: IdParamsSchema },
  responses: {
    [httpStatus.OK]: { desc: "Account found", schema: TransactionOutputSchema },
    [httpStatus.NotFound]: { desc: "Account not found" },
  },
});

transactionsRoute.get(
  "/:id",
  validate(IdParamsSchema, "params"),
  findTransactionByIdController
);

export default transactionsRoute;
