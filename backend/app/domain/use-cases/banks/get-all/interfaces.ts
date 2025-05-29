import { GetAllBanksResponse } from "@useCases/banks/get-all/response";

export interface GetAllBanksUseCaseInterface {
  execute(): Promise<GetAllBanksResponse>;
}