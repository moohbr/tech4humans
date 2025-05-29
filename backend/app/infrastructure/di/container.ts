// Repositories
import { TypeOrmAccountRepository } from "@infrastructure/datasources/databases/typeorm/repositories/account";
import { TypeOrmBankRepository } from "@infrastructure/datasources/databases/typeorm/repositories/bank";
import { TypeOrmTransactionRepository } from "@infrastructure/datasources/databases/typeorm/repositories/transaction";
import { TypeOrmUserRepository } from "@infrastructure/datasources/databases/typeorm/repositories/user";
// Errors
import { DependencyNotFoundError } from "@errors/dependency-not-found-error";
// Models
import { AccountRepositoryInterface } from "@models/account/repository/interfaces";
import { BankRepositoryInterface } from "@models/bank/repository/interfaces";
import { TransactionRepositoryInterface } from "@models/transaction/repository/interfaces";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
// Controllers
// Account
import { AddAccountToUserController } from "@infrastructure/http/routes/v1/account/controllers/add-to-a-user";
import { DeleteAccountOfUserController } from "@infrastructure/http/routes/v1/account/controllers/delete-of-a-user";
import { GetAllAccountsOfUserController } from "@infrastructure/http/routes/v1/account/controllers/get-all-of-user";
import { UpdateAccountOfUserController } from "@infrastructure/http/routes/v1/account/controllers/update-of-a-user";
// Banks
import { GetAllBanksController } from "@infrastructure/http/routes/v1/banks/controllers/get-all-banks";
// Transactions
import { AddTransactionToUserController } from "@infrastructure/http/routes/v1/transaction/controllers/add-to-a-user";
import { GetAllTransactionsOfUserController } from "@infrastructure/http/routes/v1/transaction/controllers/get-all-of-user";
// Users
import { CreateUserController } from "@infrastructure/http/routes/v1/users/controllers/create";
import { DeleteUserController } from "@infrastructure/http/routes/v1/users/controllers/delete";
import { LoginController } from "@infrastructure/http/routes/v1/users/controllers/login";
import { UpdateUserController } from "@infrastructure/http/routes/v1/users/controllers/update";
// Use Cases
// Account
import { AddAccountToUserUseCase } from "@useCases/account/add-to-a-user";
import { AddAccountToUserUseCaseInterface } from "@useCases/account/add-to-a-user/interfaces";
import { DeleteAccountOfUserUseCase } from "@useCases/account/delete-of-a-user";
import { DeleteAccountOfUserUseCaseInterface } from "@useCases/account/delete-of-a-user/interfaces";
import { GetAllAccountsOfUserUseCase } from "@useCases/account/get-all-of-user";
import { GetAllAccountsOfUserUseCaseInterface } from "@useCases/account/get-all-of-user/interfaces";
import { UpdateAccountOfUserUseCase } from "@useCases/account/update-of-a-user";
import { UpdateAccountOfUserUseCaseInterface } from "@useCases/account/update-of-a-user/interfaces";
// Banks
import { GetAllBanksUseCase } from "@useCases/banks/get-all";
import { GetAllBanksUseCaseInterface } from "@useCases/banks/get-all/interfaces";
// Transactions
import { AddTransactionToUserUseCase } from "@useCases/transaction/add-to-a-user";
import { AddTransactionToUserUseCaseInterface } from "@useCases/transaction/add-to-a-user/interfaces";
import { GetAllOfUserUseCase } from "@useCases/transaction/get-all-of-user";
import { GetAllOfUserUseCaseInterface } from "@useCases/transaction/get-all-of-user/interfaces";
// Users
import { CreateUserUseCase } from "@useCases/user/create";
import { CreateUserUseCaseInterface } from "@useCases/user/create/interfaces";
import { DeleteUserUseCase } from "@useCases/user/delete";
import { DeleteUserUseCaseInterface } from "@useCases/user/delete/interfaces";
import { LoginUseCase } from "@useCases/user/login";
import { LoginUseCaseInterface } from "@useCases/user/login/interfaces";
import { UpdateUserUseCase } from "@useCases/user/update";
import { UpdateUserUseCaseInterface } from "@useCases/user/update/interfaces";
// Services
import { AuthService } from "@services/auth";
import { AuthServiceInterface } from "@services/auth/interfaces";


export class DIContainer {
  private static instance: DIContainer;
  private dependencies: Map<string, unknown> = new Map();

  private constructor() {
    this.registerDependencies();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  private registerDependencies(): void {
    this.registerRepositories();
    this.registerServices();
    this.registerUseCases();
    this.registerControllers();
  }

  private registerRepositories(): void {
    this.dependencies.set("UserRepository", new TypeOrmUserRepository());
    this.dependencies.set("AccountRepository", new TypeOrmAccountRepository());
    this.dependencies.set("BankRepository", new TypeOrmBankRepository());
    this.dependencies.set("TransactionRepository", new TypeOrmTransactionRepository());
  }

  private registerServices(): void {
    this.dependencies.set("AuthService", new AuthService());
  }

  private registerUseCases(): void {
    this.dependencies.set(
      "AddAccountToUserUseCase",
      new AddAccountToUserUseCase(
        this.get<AccountRepositoryInterface>("AccountRepository"),
        this.get<UserRepositoryInterface>("UserRepository"),
      ),
    );
    this.dependencies.set(
      "DeleteAccountOfUserUseCase",
      new DeleteAccountOfUserUseCase(
        this.get<AccountRepositoryInterface>("AccountRepository"),
      ),
    );
    this.dependencies.set(
      "GetAllAccountsOfUserUseCase",
      new GetAllAccountsOfUserUseCase(
        this.get<AccountRepositoryInterface>("AccountRepository"),
      ),
    );
    this.dependencies.set(
      "UpdateAccountOfUserUseCase",
      new UpdateAccountOfUserUseCase(
        this.get<AccountRepositoryInterface>("AccountRepository"),
      ),
    );
    this.dependencies.set(
      "GetAllBanksUseCase",
      new GetAllBanksUseCase(
        this.get<BankRepositoryInterface>("BankRepository"),
      ),
    );
    this.dependencies.set(
      "CreateUserUseCase",
      new CreateUserUseCase(
        this.get<UserRepositoryInterface>("UserRepository"),
        this.get<AccountRepositoryInterface>("AccountRepository"),
        this.get<BankRepositoryInterface>("BankRepository"),
      ),
    );
    this.dependencies.set(
      "DeleteUserUseCase",
      new DeleteUserUseCase(
        this.get<UserRepositoryInterface>("UserRepository"),
      ),
    );
    this.dependencies.set(
      "LoginUserUseCase",
      new LoginUseCase(
        this.get<UserRepositoryInterface>("UserRepository"),
        this.get<AuthServiceInterface>("AuthService"),
      ),
    );
    this.dependencies.set(
      "UpdateUserUseCase",
      new UpdateUserUseCase(
        this.get<UserRepositoryInterface>("UserRepository"),
      ),
    );
    this.dependencies.set(
      "AddTransactionToUserUseCase",
      new AddTransactionToUserUseCase(
        this.get<AccountRepositoryInterface>("AccountRepository"),
        this.get<TransactionRepositoryInterface>("TransactionRepository"),
      ),
    );
    this.dependencies.set(
      "GetAllTransactionsOfUserUseCase",
      new GetAllOfUserUseCase(
        this.get<TransactionRepositoryInterface>("TransactionRepository"),
      ),
    );
  }

  private registerControllers(): void {
    this.dependencies.set(
      "AddAccountToUserController",
      new AddAccountToUserController(
        this.get<AddAccountToUserUseCaseInterface>("AddAccountToUserUseCase"),
      ),
    );
    this.dependencies.set(
      "DeleteAccountOfUserController",
      new DeleteAccountOfUserController(
        this.get<DeleteAccountOfUserUseCaseInterface>("DeleteAccountOfUserUseCase"),
      ),
    );
    this.dependencies.set(
      "GetAllAccountsOfUserController",
      new GetAllAccountsOfUserController(
        this.get<GetAllAccountsOfUserUseCaseInterface>("GetAllAccountsOfUserUseCase"),
      ),
    );
    this.dependencies.set(
      "UpdateAccountOfUserController",
      new UpdateAccountOfUserController(
        this.get<UpdateAccountOfUserUseCaseInterface>("UpdateAccountOfUserUseCase"),
      ),
    );
    this.dependencies.set(
      "GetAllBanksController",
      new GetAllBanksController(
        this.get<GetAllBanksUseCaseInterface>("GetAllBanksUseCase"),
      ),
    );
    this.dependencies.set(
      "CreateUserController",
      new CreateUserController(
        this.get<CreateUserUseCaseInterface>("CreateUserUseCase"),
      ),
    );
    this.dependencies.set(
      "DeleteUserController",
      new DeleteUserController(
        this.get<DeleteUserUseCaseInterface>("DeleteUserUseCase"),
      ),
    );
    this.dependencies.set(
      "LoginController",
      new LoginController(
        this.get<LoginUseCaseInterface>("LoginUserUseCase"),
      ),
    );
    this.dependencies.set(
      "UpdateUserController",
      new UpdateUserController(
        this.get<UpdateUserUseCaseInterface>("UpdateUserUseCase"),
      ),
    );
    this.dependencies.set(
      "AddTransactionToUserController",
      new AddTransactionToUserController(
        this.get<AddTransactionToUserUseCaseInterface>("AddTransactionToUserUseCase"),
      ),
    );
    this.dependencies.set(
      "GetAllTransactionsOfUserController",
      new GetAllTransactionsOfUserController(
        this.get<GetAllOfUserUseCaseInterface>("GetAllTransactionsOfUserUseCase"),
      ),
    );

  }

  public get<T>(key: string): T {
    const dependency = this.dependencies.get(key) as T;
    if (!dependency) {
      throw new DependencyNotFoundError(key);
    }
    return dependency;
  }

  public register<T>(key: string, instance: T): void {
    this.dependencies.set(key, instance);
  }

  public has(key: string): boolean {
    return this.dependencies.has(key);
  }
}
