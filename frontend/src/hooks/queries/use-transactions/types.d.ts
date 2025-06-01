type UseTransactionsOptions = Pick<Transaction, "userId"> & {
  enabled?: boolean;
  refetchInterval?: number | false;
};
