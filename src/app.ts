import express from "express";
import cors from "cors";
import { notFound } from "@/middlewares/NotFound";
import { errorHandling } from "@/middlewares/ErrorHandling";
import { accountsRoute } from "./accounts/account.route";
import transactionsRoute from "./transactions/transaction.route";
import { logger } from "./middlewares/LoggerRequest";

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.use("/accounts", accountsRoute);
app.use("/transaction", transactionsRoute);

app.use(notFound);
app.use(errorHandling);

export default app;
