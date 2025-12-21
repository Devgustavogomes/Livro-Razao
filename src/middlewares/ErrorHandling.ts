import type { Request, Response, NextFunction } from "express";
import { httpErrors } from "@/config/constants/HttpErrors";

export function errorHandling(
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  res.status(httpErrors.InternalServerError).json({
    error: "Internal Server Error",
  });
}
