import { ZodError } from "zod";
import { LoginRequest } from "@useCases/user/login/request";
import { LoginResponse } from "@useCases/user/login/response";
import { LoginUseCaseInterface } from "@useCases/user/login/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { AuthServiceInterface } from "@services/auth/interfaces";
import { UserEmail } from "@models/user/value-objects/email";
import { UserPassword } from "@models/user/value-objects/password";   
import { InvalidCredentialsError } from "@errors/user/invalid-credentials-error";

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly authService: AuthServiceInterface,
  ) {}

  public async execute(request: LoginRequest): Promise<LoginResponse> {
    try {
      const email = UserEmail.create(request.getEmail());
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new InvalidCredentialsError();
      }

      const userPassword = UserPassword.createFromHash(user.getPasswordHash());
      const isValid = await userPassword.compare(request.getPassword());

      if (!isValid) {
        throw new InvalidCredentialsError();
      }

      const token = this.authService.generateToken(user.getId().getValue());

      return LoginResponse.success({
        token,
        user,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): LoginResponse {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      return LoginResponse.validationFailure(errors);
    }

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return LoginResponse.failure("Houve um erro ao fazer login", [message]);
  }
}
