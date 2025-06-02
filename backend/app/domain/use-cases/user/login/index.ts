import { ZodError } from "zod";
import { LoginRequest } from "@useCases/user/login/request";
import { LoginResponse } from "@useCases/user/login/response";
import { LoginUseCaseInterface } from "@useCases/user/login/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { AuthServiceInterface } from "@services/auth/interfaces";
import { UserEmail } from "@models/user/value-objects/email";
import { UserPassword } from "@models/user/value-objects/password";   
import { InvalidCredentialsError } from "@errors/user/invalid-credentials-error";
import { logger } from "@infrastructure/logger";

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly authService: AuthServiceInterface,
  ) {}

  public async execute(request: LoginRequest): Promise<LoginResponse> {
    try {
      logger.info("Starting login process", { email: request.getEmail().getValue() });

      const user = await this.userRepository.findByEmail(request.getEmail());

      if (!user) {
        const error = new InvalidCredentialsError();
        logger.error("User not found during login attempt", { 
          email: request.getEmail().getValue(),
          error: error.message, 
          statusCode: error.getStatusCode() 
        });
        throw error;
      }

      logger.debug("User found, validating password", { userId: user.getId().getValue() });

      const isValid = await request.getPassword().compareWithHash(user.getPasswordHash());

      if (!isValid) {
        const error = new InvalidCredentialsError(); 
        logger.error("Invalid password during login attempt", { 
          userId: user.getId().getValue(),
          error: error.message, 
          statusCode: error.getStatusCode() 
        });
        throw error;
      }

      const token = this.authService.generateToken({
        id: user.getId().getValue(),
        name: user.getName().getValue(),
        email: user.getEmail().getValue(),
      });
      
      logger.info("Login successful", { 
        userId: user.getId().getValue(),
        email: user.getEmail().getValue()
      });

      return LoginResponse.success({
        token,
        user,
      });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw error;
      }
      
      logger.error("Unexpected error during login", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      });
      
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): LoginResponse {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    const errors = error instanceof Error ? [error] : [new Error(message)];
    return LoginResponse.failure("Houve um erro ao fazer login", errors);
  }
}
