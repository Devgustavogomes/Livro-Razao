import express from "express";
import {
  createAccountController,
  getAccountByIdController,
} from "./account.controller";
import { validate } from "@/middlewares/Validate";
import { CreateAccountSchema } from "./dto/accountEntry.dto";
import { IdParamsSchema } from "@/types/IdParams";
import { DocumentPath } from "@/config/utils/swagger.utils";
import { AccountOutputSchema } from "./dto/accountOutput.dto";

const accountsRoute = express.Router();

DocumentPath({
  method: "post",
  description: "Create account",
  summary: "Route to create a account",
  path: "/accounts",
  tags: ["Account"],
  request: { body: CreateAccountSchema },
  responses: { 201: { desc: "Created", schema: AccountOutputSchema } },
});

accountsRoute.post(
  "/",
  validate(CreateAccountSchema, "body"),
  createAccountController
);

DocumentPath({
  method: "get",
  description: "Find account",
  summary: "Return one account",
  path: "/accounts/{id}",
  tags: ["Account"],
  request: { params: IdParamsSchema },
  responses: {
    200: { desc: "Account found", schema: AccountOutputSchema },
    400: { desc: "Account not found" },
  },
});

accountsRoute.get(
  "/:id",
  validate(IdParamsSchema, "params"),
  getAccountByIdController
);

export { accountsRoute };
