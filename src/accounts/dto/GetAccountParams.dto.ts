import z from "zod";

const GetAccountParamsSchema = z.object({
  id: z.uuid(),
});

export { GetAccountParamsSchema };
