
import { z } from "zod";
import { TransactionSchemas } from "@models/transaction/schemas";
import { TransactionId } from "@models/transaction/value-objects/id";
import { TransactionAmount } from "@models/transaction/value-objects/amount";
import { TransactionDescription } from "@models/transaction/value-objects/description";
import { AccountId } from "@models/account/value-objects/id";
import { TransactionTypeVo } from "@models/transaction/value-objects/type";
import { TransactionRawEntity } from "@models/transaction/entity/types";

export class TransactionEntity {
  private constructor(
    private readonly id: TransactionId | null,
    private readonly amount: TransactionAmount,
    private readonly description: TransactionDescription,
    private readonly destinationAccountId: AccountId,
    private readonly sourceAccountId: AccountId,
    private readonly type: TransactionTypeVo,
) {}

  public static create(params: z.infer<typeof TransactionSchemas.createTransactionSchema>): TransactionEntity {
    const validatedData = TransactionSchemas.createTransactionSchema.parse(params);
    return new TransactionEntity(
      null,
      TransactionAmount.create(validatedData.amount),
      TransactionDescription.create(validatedData.description),
      AccountId.create(validatedData.destinationAccountId),
      AccountId.create(validatedData.sourceAccountId),
      TransactionTypeVo.create(validatedData.type),
    );
  }

  public static createFromDatabase(params: z.infer<typeof TransactionSchemas.transactionEntitySchema>): TransactionEntity {
    const validatedData = TransactionSchemas.transactionEntitySchema.parse(params);
    return new TransactionEntity(
      TransactionId.create(validatedData.id),
      TransactionAmount.create(validatedData.amount),
      TransactionDescription.create(validatedData.description),
      AccountId.create(validatedData.destinationAccountId),
      AccountId.create(validatedData.sourceAccountId),
      TransactionTypeVo.create(validatedData.type),
    );
  }

  public getId(): TransactionId | null {
    return this.id;
  }


  public getDestinationAccountId(): AccountId {
    return this.destinationAccountId;
  }

  public getSourceAccountId(): AccountId {
    return this.sourceAccountId;
  }
  
  public getAmount(): TransactionAmount {
    return this.amount;
  }

  public getDescription(): TransactionDescription {
    return this.description;
  }

  public getType(): TransactionTypeVo {
    return this.type;
  }

  public toPersistence(): TransactionRawEntity {
    return {
      id: this.id?.getValue() ?? 0,
      amount: this.amount.getValue(),
      description: this.description.getValue(),
      destinationAccountId: this.destinationAccountId.getValue(),
      sourceAccountId: this.sourceAccountId.getValue(),
      type: this.type.getValue(),
    };
  }

  public toJSON(): TransactionRawEntity {
    return {
      id: this.id?.getValue() ?? 0,
      amount: this.amount.getValue(),
      description: this.description.getValue(),
      destinationAccountId: this.destinationAccountId.getValue(),
      sourceAccountId: this.sourceAccountId.getValue(),
      type: this.type.getValue()
    };
  }

  public static reconstruct(params: z.infer<typeof TransactionSchemas.transactionEntitySchema>): TransactionEntity {
    return new TransactionEntity(
      TransactionId.create(params.id),
      TransactionAmount.create(params.amount),
      TransactionDescription.create(params.description),
      AccountId.create(params.destinationAccountId),
      AccountId.create(params.sourceAccountId),
      TransactionTypeVo.create(params.type),
    );
  }
}

