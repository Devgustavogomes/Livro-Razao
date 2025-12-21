import type { Request, Response } from "express";
import { createAccountService } from "./account.service";

function createAccountController(req: Request, _res: Response) {
  createAccountService(req.body);
}

export { createAccountController };
