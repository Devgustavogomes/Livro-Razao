import express from "express";
import cors from "cors";
import { notFound } from "./middlewares/NotFound.js";
import { errorHandling } from "./middlewares/ErrorHandling.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(notFound);
app.use(errorHandling);

export { app };
