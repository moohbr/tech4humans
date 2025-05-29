import { DeleteUserSchemas } from "@useCases/user/delete/schemas";

export class DeleteUserRequest {
  constructor(private readonly id: number) {}

  public static createFromRaw(raw: unknown): DeleteUserRequest {
    const parsed = DeleteUserSchemas.requestSchema.parse(raw);
    return new DeleteUserRequest(parsed.id);
  }

  public getId(): number {
    return this.id;
  }
}
