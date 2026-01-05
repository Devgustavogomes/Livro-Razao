import { CreateAccountSchema } from "@/accounts/dto/accountEntry.dto";
import { TransactionSchema } from "@/transactions/dto/transactionEntry.dto";
import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

const registry = new OpenAPIRegistry();

registry.register("Account", CreateAccountSchema);
registry.register("Transaction", TransactionSchema);

function Swagger() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
      description: "This is the API",
    },
    servers: [{ url: "v1" }],
  });
}

export { registry, Swagger };
