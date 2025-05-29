import { ZodError } from "zod";
import { GetAllOfUserRequest } from "@useCases/transaction/get-all-of-user/request";
import { GetAllOfUserResponse } from "@useCases/transaction/get-all-of-user/response";
import { UserId } from "@models/user/value-objects/id";
import { GetAllOfUserUseCaseInterface } from "@useCases/transaction/get-all-of-user/interfaces";
import { GetAllOfUserSchemas } from "@useCases/transaction/get-all-of-user/schemas";
import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";

export class GetAllOfUserUseCase implements GetAllOfUserUseCaseInterface {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  public async execute(request: GetAllOfUserRequest): Promise<GetAllOfUserResponse> {
    try {
      const validated = GetAllOfUserSchemas.httpRequestSchema.parse({
        params: {
          userId: request.getUserId(),
        },
      });

      const userId = UserId.create(validated.params.userId);
      const transactions = await this.transactionRepository.findByUserId(userId);
      if (!transactions || transactions.length === 0) {
        return GetAllOfUserResponse.failure("No transactions found", []);
      }     

      return GetAllOfUserResponse.success(transactions);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): GetAllOfUserResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return GetAllOfUserResponse.failure("Failed to fetch transactions", errors);
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return GetAllOfUserResponse.failure("Failed to fetch transactions", [message]);
  }
}
