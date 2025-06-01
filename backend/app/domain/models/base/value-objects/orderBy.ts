import { OrderBySchemas } from "../schemas/orderBy";
import { OrderByType } from "../entities/orderBy/enum";
import { InvalidOrderByError } from "@domain/errors/base/invalid-order-by-error";

export class OrderBy {
  private constructor(private value: OrderByType) {
    if (!Object.values(OrderByType).includes(value)) {
      throw new InvalidOrderByError(value);
    }
  }

  public static create(type: unknown): OrderBy {
    const validatedType = OrderBySchemas.orderBySchema.parse(type);
    return new OrderBy(validatedType);
  }

  public getValue(): OrderByType {
    return this.value;
  }
}
