import { validate } from "@/middlewares/Validate";
import express from "express";
import TransactionSchema from "./dto/transaction.dto";

const transactionsRoute = express.Router();

transactionsRoute.post("/", validate(TransactionSchema, "body"));
