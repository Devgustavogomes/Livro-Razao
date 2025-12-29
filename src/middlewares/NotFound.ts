import type { Request, Response } from "express";
import { httpStatus } from "@/config/constants/HttpStatus";

export function notFound(_: Request, res: Response) {
  return res.status(httpStatus.NotFound).json({ message: "Page not found" });
}
