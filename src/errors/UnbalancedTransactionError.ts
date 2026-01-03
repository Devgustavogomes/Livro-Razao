export class UnbalancedTransactionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnbalancedTransactionError";
  }
}
