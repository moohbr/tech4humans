import { Account } from "@/types/account/types";

type UseAccountsOptions = Pick<Account, "userId"> & {
  enabled?: boolean;
};