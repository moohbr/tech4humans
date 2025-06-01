type UseTransactionsOptions = Pick<Transaction, "userId"> & {
  enabled?: boolean;
};
