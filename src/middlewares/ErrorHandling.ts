import type { Request, Response, NextFunction } from "express";
import { httpStatus } from "@/config/constants/HttpStatus";
import { ZodError } from "zod";
import { NotFoundError } from "@/Errors/NotFoundError";

export function errorHandling(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof NotFoundError) {
    return res.status(httpStatus.NotFound).json(error.message);
  } else if (error instanceof ZodError) {
    return res.status(httpStatus.BadRequest).json(error.issues[0].message);
  }

  return res.status(httpStatus.InternalServerError).json({
    error: "Internal Server Error",
  });
}
