import { OrderByType } from "@models/base/entities/orderBy/enum";
import { ValidationError } from "../validation-error";

export class InvalidOrderByError extends ValidationError {
  constructor(value: OrderByType) {
    super(`Invalid order by value: ${value}`);
  }
}