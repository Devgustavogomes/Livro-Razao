import express from "express";
import {
  createAccountController,
  getAccountByIdController,
} from "./account.controller";
import { validate } from "@/middlewares/Validate";
import { CreateAccountSchema } from "./dto/AccountEntry.dto";
import { GetAccountParamsSchema } from "./dto/GetAccountParams.dto";

const accounts = express.Router();

accounts.post(
  "/",
  validate(CreateAccountSchema, "body"),
  createAccountController
);

accounts.get(
  "/:id",
  validate(GetAccountParamsSchema, "params"),
  getAccountByIdController
);

export { accounts };
