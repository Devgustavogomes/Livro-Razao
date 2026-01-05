import { ZodSchema } from "zod";
import { registry } from "../swagger";
import { RouteParameter } from "@asteasolutions/zod-to-openapi/dist/openapi-registry";

type Method = "get" | "post" | "put" | "delete";

type ResponseConfig = {
  [statusCode: number]: {
    desc: string;
    schema?: ZodSchema;
  };
};

export function DocumentPath({
  method,
  path,
  description,
  summary,
  tags,
  request,
  responses,
}: {
  method: Method;
  path: string;
  description?: string;
  summary?: string;
  tags: string[];
  request: {
    body?: ZodSchema;
    query?: RouteParameter;
    params?: RouteParameter;
  };
  responses: ResponseConfig;
}) {
  const formattedResponse = Object.fromEntries(
    Object.entries(responses).map(([code, { desc, schema }]) => [
      code,
      {
        description: desc,
        content: schema ? { "application/json": { schema } } : undefined,
      },
    ])
  );

  registry.registerPath({
    method,
    path,
    description,
    summary,
    tags,
    request: {
      body: request?.body
        ? { content: { "application/json": { schema: request.body } } }
        : undefined,
      query: request?.query,
      params: request?.params,
    },
    responses: formattedResponse,
  });
}
