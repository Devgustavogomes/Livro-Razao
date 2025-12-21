import type { Request, Response } from "express";
import { httpErrors } from "../config/constants/HttpErrors.js";

export function notFound(_: Request, res: Response) {
  res.status(httpErrors.NotFound).json({ error: "Page not found" });
}
