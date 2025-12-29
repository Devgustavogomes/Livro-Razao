import express from "express";
import {
  createAccountController,
  getAccountByIdController,
} from "./account.controller";
import { validate } from "@/middlewares/Validate";
import { CreateAccountSchema } from "./dto/AccountEntry.dto";
import { GetAccountParamsSchema } from "./dto/GetAccountParams.dto";

const accountsRoute = express.Router();

accountsRoute.post(
  "/",
  validate(CreateAccountSchema, "body"),
  createAccountController
);

accountsRoute.get(
  "/:id",
  validate(GetAccountParamsSchema, "params"),
  getAccountByIdController
);

export { accountsRoute };
