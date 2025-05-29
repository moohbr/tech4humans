var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/domain/models/bank/schemas/index.ts
import { z } from "zod";
var BankSchemas = class {
  static {
    __name(this, "BankSchemas");
  }
  static nameSchema = z.string().min(2, "Name must have at least 2 characters").max(100, "Name cannot exceed 100 characters").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces");
  static createBankSchema = z.object({
    name: this.nameSchema
  });
  static bankEntitySchema = z.object({
    name: this.nameSchema
  });
};

// app/domain/models/bank/value-objects/name.ts
var BankName = class _BankName {
  static {
    __name(this, "BankName");
  }
  value;
  constructor(value) {
    this.value = value;
  }
  static create(value) {
    const validated = BankSchemas.nameSchema.parse(value);
    return new _BankName(validated);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
  }
};

// app/domain/models/bank/entity/index.ts
var BankEntity = class _BankEntity {
  static {
    __name(this, "BankEntity");
  }
  name;
  constructor(name) {
    this.name = name;
  }
  static create(name) {
    const validated = BankSchemas.createBankSchema.parse({
      name
    });
    return new _BankEntity(BankName.create(validated.name));
  }
  static reconstruct(name) {
    const validated = BankSchemas.bankEntitySchema.parse({
      name
    });
    return new _BankEntity(BankName.create(validated.name));
  }
  getName() {
    return this.name;
  }
  toJSON() {
    return {
      name: this.name.getValue()
    };
  }
  toPersistence() {
    return {
      name: this.name.getValue()
    };
  }
};
export {
  BankEntity
};
//# sourceMappingURL=index.mjs.map