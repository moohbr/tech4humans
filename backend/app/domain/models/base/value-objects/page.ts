import { PageSchemas } from '../schemas/page';

export class Page {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: unknown): Page {
    const validatedValue = PageSchemas.pageSchema.parse(value);
    return new Page(validatedValue);
  }

  public getValue(): number {
    return this.value;
  }

  public toJSON(): number {
    return this.value;
  }
}
