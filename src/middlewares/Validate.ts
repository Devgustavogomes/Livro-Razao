import type { NextFunction, Response, Request } from "express";
import type { ZodSchema } from "zod";

export function validate(
  schema: ZodSchema,
  property: "body" | "params" | "query"
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      return next(result.error);
    }

    return next();
  };
}
