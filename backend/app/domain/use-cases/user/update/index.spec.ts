import { ZodError } from "zod";
import { UpdateUserUseCase } from "./index";
import { UpdateUserRequest } from "./request";
import { UserRepositoryInterface } from "@models/user/repository/interfaces";
import { UserEntity } from "@models/user/entity";
import { UserId } from "@models/user/value-objects/id";
import { UpdateUserSchemas } from "./schemas";

jest.mock("./schemas", () => ({
  UpdateUserSchemas: {
    httpRequestSchema: {
      parse: jest.fn(),
    },
  },
}));

jest.mock("@models/user/value-objects/id", () => ({
  UserId: {
    create: jest.fn(),
  },
}));

jest.mock("@models/user/entity", () => ({
  UserEntity: {
    create: jest.fn(),
  },
}));

describe("UpdateUserUseCase", () => {
  let useCase: UpdateUserUseCase;
  let userRepository: jest.Mocked<UserRepositoryInterface>;
  let mockRequest: UpdateUserRequest;
  let mockUserId: any;
  let mockUserEntity: any;

  beforeEach(() => {
    jest.clearAllMocks();

    userRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new UpdateUserUseCase(userRepository);

    mockRequest = new UpdateUserRequest(
      1,
      "John Doe",
      "john@example.com",
      "newpassword123"
    );

    mockUserId = { value: 1 };
    mockUserEntity = {
      getId: () => ({ getValue: () => 1 }),
      getName: () => "John Doe",
      getEmail: () => "john@example.com",
    };

    (UserId.create as jest.Mock).mockReturnValue(mockUserId);
    (UserEntity.create as jest.Mock).mockReturnValue(mockUserEntity);
  });

  it("should successfully update a user", async () => {
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123",
        },
      },
      params: {
        id: 1,
      },
    };

    const existingUser = {
      getId: () => ({ getValue: () => 1 }),
    } as UserEntity;

    const updatedUser = {
      getId: () => ({ getValue: () => 1 }),
      getName: () => "John Doe",
      getEmail: () => "john@example.com",
    } as unknown as UserEntity;

    (UpdateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.findById.mockResolvedValue(existingUser);
    userRepository.update.mockResolvedValue(updatedUser);

    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(true);
    expect(result.getMessage()).toBe("User updated successfully");
    expect(result.getUser()).toBe(updatedUser);
    expect(UpdateUserSchemas.httpRequestSchema.parse).toHaveBeenCalledWith({
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123",
        },
      },
      params: {
        id: 1,
      },
    });
    expect(UserId.create).toHaveBeenCalledWith(1);
    expect(userRepository.findById).toHaveBeenCalledWith(mockUserId);
    expect(UserEntity.create).toHaveBeenCalledWith("John Doe", "john@example.com", "newpassword123");
    expect(userRepository.update).toHaveBeenCalledWith(mockUserId, mockUserEntity);
  });

  it("should fail if user not found", async () => {
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123",
        },
      },
      params: {
        id: 1,
      },
    };

    (UpdateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(mockRequest);

    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toContain(`User with ID ${mockRequest.getId()} not found`);
  });

  it("should fail with validation error for invalid email", async () => {
    // Arrange
    const invalidRequest = new UpdateUserRequest(1, "John Doe", "invalid-email", "newpassword123");

    const zodError = new ZodError([
      {
        code: "invalid_string",
        validation: "email",
        message: "Invalid email format",
        path: ["body", "user", "email"],
      },
    ]);

    (UpdateUserSchemas.httpRequestSchema.parse as jest.Mock).mockImplementation(() => {
      throw zodError;
    });

    // Act
    const result = await useCase.execute(invalidRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.email: Invalid email format");
  });

  it("should fail with validation error for invalid password", async () => {
    // Arrange
    jest.spyOn(mockRequest, 'getPassword').mockReturnValue("short");

    const zodError = new ZodError([
      {
        code: "too_small",
        minimum: 8,
        type: "string",
        inclusive: true,
        exact: false,
        message: "Password must be at least 8 characters long",
        path: ["body", "user", "password"],
      },
    ]);

    (UpdateUserSchemas.httpRequestSchema.parse as jest.Mock).mockImplementation(() => {
      throw zodError;
    });

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.password: Password must be at least 8 characters long");
  });

  it("should fail with validation error for invalid name", async () => {
    // Arrange
    jest.spyOn(mockRequest, 'getName').mockReturnValue("");

    const zodError = new ZodError([
      {
        code: "too_small",
        minimum: 1,
        type: "string",
        inclusive: true,
        exact: false,
        message: "Name cannot be empty",
        path: ["body", "user", "name"],
      },
    ]);

    (UpdateUserSchemas.httpRequestSchema.parse as jest.Mock).mockImplementation(() => {
      throw zodError;
    });

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Validation failed");
    expect(result.getErrors()).toContain("body.user.name: Name cannot be empty");
  });

  it("should handle unknown errors", async () => {
    // Arrange
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123",
        },
      },
      params: {
        id: 1,
      },
    };

    (UpdateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.findById.mockRejectedValue(new Error("Database connection failed"));

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toBe("Database connection failed");
  });

  it("should handle UserNotFoundError specifically", async () => {
    // Arrange
    const validatedData = {
      body: {
        user: {
          name: "John Doe",
          email: "john@example.com",
          password: "newpassword123",
        },
      },
      params: {
        id: 1,
      },
    };

    (UpdateUserSchemas.httpRequestSchema.parse as jest.Mock).mockReturnValue(validatedData);
    userRepository.findById.mockResolvedValue(null);

    // Act
    const result = await useCase.execute(mockRequest);

    // Assert
    expect(result.isSuccess()).toBe(false);
    expect(result.getMessage()).toContain(`User with ID ${mockRequest.getId()} not found`);
  });
});