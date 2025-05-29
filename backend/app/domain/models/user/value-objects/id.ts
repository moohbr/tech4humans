import { UserSchemas } from "@models/user/schemas";
import { InvalidUserIdError } from "@errors/user/invalid-user-id-error";

export class UserId {
  private constructor(
    private readonly value: number | null,
    private readonly isNewId: boolean = false,
  ) {}

  public static create(id: number): UserId {
    const validatedId = UserSchemas.userIdSchema.parse(id);
    return new UserId(validatedId, false);
  }

  public static createNew(): UserId {
    return new UserId(null, true);
  }

  public static createFromDatabase(id: number): UserId {
    const validatedId = UserSchemas.userIdSchema.parse(id);
    return new UserId(validatedId, false);
  }

  public static createUnsafe(id: number): UserId {
    return new UserId(id, false);
  }

  public getValue(): number {
    if (this.value === null) {
      throw new InvalidUserIdError();
    }
    return this.value;
  }

  public isNew(): boolean {
    return this.isNewId;
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value?.toString() ?? "new";
  }
}
