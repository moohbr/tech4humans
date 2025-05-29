import { UserEmail } from "@models/user/value-objects/email";
import { UserName } from "@models/user/value-objects/name";
import { UserId } from "@models/user/value-objects/id";
import { UserPassword } from "@models/user/value-objects/password";
import { UserSchemas } from "@models/user/schemas";

export class UserEntity {
  private constructor(
    private readonly id: UserId,
    private readonly name: UserName,
    private readonly email: UserEmail,
    private readonly createdAt: Date,
    private readonly password: UserPassword,
  ) {}

  public static create(
    name: string,
    email: string,
    passwordHash: string,
  ): UserEntity {
    const validatedData = UserSchemas.createUserSchema.parse({
      name,
      email,
      passwordHash,
    });
    return new UserEntity(
      UserId.createNew(),
      UserName.create(validatedData.name),
      UserEmail.create(validatedData.email),
      new Date(),
      UserPassword.createFromHash(passwordHash),
    );
  }

  public static reconstruct(
    id: number,
    name: string,
    email: string,
    createdAt: Date,
    passwordHash: string,
  ): UserEntity {
    const validatedData = UserSchemas.userEntitySchema.parse({
      id,
      name,
      email,
      createdAt,
      passwordHash,
    });
    return new UserEntity(
      UserId.createFromDatabase(validatedData.id),
      UserName.create(validatedData.name),
      UserEmail.create(validatedData.email),
      validatedData.createdAt,
      UserPassword.createFromHash(passwordHash),
    );
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): UserName {
    return this.name;
  }

  public getEmail(): UserEmail {
    return this.email;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getPasswordHash(): string {
    return this.password.getValue();
  }

  public toPersistence(): UserRawEntity {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt,  
      passwordHash: this.password.getValue(),
    };
  }

  public toJSON(): Omit<UserRawEntity, "passwordHash"> {
    return {
      id: this.id.isNew() ? null : this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt,
    };
  }
}
