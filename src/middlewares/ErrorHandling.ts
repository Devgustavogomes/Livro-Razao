import type { Request, Response, NextFunction } from "express";
import { httpStatus } from "@/config/constants/HttpStatus";
import { ZodError } from "zod";
import { NotFoundError } from "@/errors/NotFoundError";

export function errorHandling(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof NotFoundError) {
    return res.status(httpStatus.NotFound).json(error);
  } else if (error instanceof ZodError) {
    return res.status(httpStatus.BadRequest).json(error.issues[0]);
  }

  return res
    .status(httpStatus.InternalServerError)
    .json({ message: "Internal Server Error" });
}
