import express from "express";
import {
  createAccountController,
  getAccountByIdController,
} from "./account.controller";
import { validate } from "@/middlewares/Validate";
import { CreateAccountSchema } from "./dto/account.dto";
import { IdParamsSchema } from "@/types/IdParams";

const accountsRoute = express.Router();

accountsRoute.post(
  "/",
  validate(CreateAccountSchema, "body"),
  createAccountController
);

accountsRoute.get(
  "/:id",
  validate(IdParamsSchema, "params"),
  getAccountByIdController
);

export { accountsRoute };
