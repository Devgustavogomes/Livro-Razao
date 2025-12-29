import z from "zod";

const IdParamsSchema = z.object({
  id: z.uuid(),
});

export { IdParamsSchema };
