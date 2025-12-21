import express from "express";
import { createAccountController } from "./account.controller";

const accounts = express.Router();

accounts.post("/", createAccountController);

accounts.get("/:id");

export { accounts };
