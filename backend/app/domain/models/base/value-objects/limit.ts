import { LimitSchemas } from '../schemas/limit';

export class Limit {
  private readonly value: number;
  
  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: unknown): Limit {
    const validatedValue = LimitSchemas.limitSchema.parse(value);
    return new Limit(validatedValue);
  }

  public getValue(): number {
    return this.value;
  }

  public toJSON(): number {
    return this.value;
  }
}
