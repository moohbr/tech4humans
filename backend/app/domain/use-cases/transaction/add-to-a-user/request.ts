import { TransactionType } from "@infrastructure/datasources/databases/typeorm/models/enums";
import { AddTransactionToUserSchemas } from "@useCases/transaction/add-to-a-user/schemas";
import { AccountId } from "@models/account/value-objects/id";
import { TransactionTypeVo } from "@models/transaction/value-objects/type";
import { TransactionAmount } from "@models/transaction/value-objects/amount";
import { InvalidTransactionTypeError } from "@errors/transaction/invalid-transaction-type-error";

export class AddTransactionToUserRequest {
    constructor(
        private readonly sourceAccountId: AccountId,
        private readonly destinationAccountId: AccountId,
        private readonly type: TransactionTypeVo,
        private readonly amount: TransactionAmount,
    ) {
        if (this.sourceAccountId.equals(this.destinationAccountId)) {
            throw new InvalidTransactionTypeError("A conta de origem e destino não podem ser iguais");
        }
    }

    public static createFromRaw(raw: unknown): AddTransactionToUserRequest {
        const parsed = AddTransactionToUserSchemas.httpRequestSchema.parse(raw);
        return new AddTransactionToUserRequest(
            AccountId.create(parsed.params.sourceAccountId),
            AccountId.create(parsed.params.destinationAccountId),
            TransactionTypeVo.create(parsed.body.type),
            TransactionAmount.create(parsed.body.amount)
        );
    }

    public getSourceAccountId(): AccountId {
        return this.sourceAccountId;
    }

    public getDestinationAccountId(): AccountId {
        return this.destinationAccountId;
    }

    public getType(): TransactionType {
        return this.type.getValue();
    }

    public getAmount(): TransactionAmount {
        return this.amount;
    }

    public getSourceAccountIdVO(): AccountId {
        return this.sourceAccountId;
    }

    public getDestinationAccountIdVO(): AccountId {
        return this.destinationAccountId;
    }

    public getTypeVO(): TransactionTypeVo {
        return this.type;
    }

    public getAmountVO(): TransactionAmount {
        return this.amount;
    }
}