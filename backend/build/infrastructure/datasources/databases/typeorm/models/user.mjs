var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/infrastructure/datasources/databases/typeorm/models/user.ts
import { Column as Column3, CreateDateColumn as CreateDateColumn2, Entity as Entity4, OneToMany as OneToMany3, PrimaryGeneratedColumn as PrimaryGeneratedColumn3 } from "typeorm";

// app/infrastructure/datasources/databases/typeorm/models/account.ts
import { Entity as Entity3, PrimaryGeneratedColumn as PrimaryGeneratedColumn2, Column as Column2, ManyToOne as ManyToOne2, OneToMany as OneToMany2, CreateDateColumn } from "typeorm";

// app/infrastructure/datasources/databases/typeorm/models/enums.ts
var AccountType = /* @__PURE__ */ function(AccountType2) {
  AccountType2["CORRENTE"] = "Corrente";
  AccountType2["POUPANCA"] = "Poupan\xE7a";
  AccountType2["CREDITO"] = "Cr\xE9dito";
  AccountType2["INVESTIMENTO"] = "Investimento";
  return AccountType2;
}({});
var TransactionType = /* @__PURE__ */ function(TransactionType2) {
  TransactionType2["DEBITO"] = "D\xE9bito";
  TransactionType2["CREDITO"] = "Cr\xE9dito";
  TransactionType2["TRANSFERENCIA"] = "Transfer\xEAncia";
  return TransactionType2;
}({});

// app/infrastructure/datasources/databases/typeorm/models/bank.ts
import { Entity, OneToMany, PrimaryColumn } from "typeorm";
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var Bank = class {
  static {
    __name(this, "Bank");
  }
  name;
  accounts;
};
_ts_decorate([
  PrimaryColumn({
    type: "text",
    unique: true
  }),
  _ts_metadata("design:type", String)
], Bank.prototype, "name", void 0);
_ts_decorate([
  OneToMany(() => Account, (account) => account.bank, {
    onDelete: "CASCADE"
  }),
  _ts_metadata("design:type", Array)
], Bank.prototype, "accounts", void 0);
Bank = _ts_decorate([
  Entity({
    name: "banks"
  })
], Bank);

// app/infrastructure/datasources/databases/typeorm/models/transactions.ts
import { Column, Entity as Entity2, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
var Transaction = class {
  static {
    __name(this, "Transaction");
  }
  id;
  type;
  sourceAccount;
  destinationAccount;
  amount;
  description;
  transactionDate;
};
_ts_decorate2([
  PrimaryGeneratedColumn(),
  _ts_metadata2("design:type", Number)
], Transaction.prototype, "id", void 0);
_ts_decorate2([
  Column({
    type: "text",
    enum: TransactionType,
    default: TransactionType.DEBITO
  }),
  _ts_metadata2("design:type", typeof TransactionType === "undefined" ? Object : TransactionType)
], Transaction.prototype, "type", void 0);
_ts_decorate2([
  ManyToOne(() => Account, {
    nullable: true
  }),
  _ts_metadata2("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "sourceAccount", void 0);
_ts_decorate2([
  ManyToOne(() => Account, {
    nullable: true
  }),
  _ts_metadata2("design:type", typeof Account === "undefined" ? Object : Account)
], Transaction.prototype, "destinationAccount", void 0);
_ts_decorate2([
  Column({
    type: "decimal",
    precision: 12,
    scale: 2
  }),
  _ts_metadata2("design:type", Number)
], Transaction.prototype, "amount", void 0);
_ts_decorate2([
  Column({
    type: "text",
    nullable: true
  }),
  _ts_metadata2("design:type", String)
], Transaction.prototype, "description", void 0);
_ts_decorate2([
  Column({
    type: "datetime",
    default: /* @__PURE__ */ __name(() => "CURRENT_TIMESTAMP", "default")
  }),
  _ts_metadata2("design:type", typeof Date === "undefined" ? Object : Date)
], Transaction.prototype, "transactionDate", void 0);
Transaction = _ts_decorate2([
  Entity2({
    name: "transactions"
  })
], Transaction);

// app/infrastructure/datasources/databases/typeorm/models/account.ts
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
var Account = class {
  static {
    __name(this, "Account");
  }
  id;
  type;
  balance;
  user;
  bank;
  transactions;
  createdAt;
};
_ts_decorate3([
  PrimaryGeneratedColumn2(),
  _ts_metadata3("design:type", Number)
], Account.prototype, "id", void 0);
_ts_decorate3([
  Column2({
    type: "text",
    enum: AccountType,
    default: AccountType.CORRENTE
  }),
  _ts_metadata3("design:type", typeof AccountType === "undefined" ? Object : AccountType)
], Account.prototype, "type", void 0);
_ts_decorate3([
  Column2({
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0
  }),
  _ts_metadata3("design:type", Number)
], Account.prototype, "balance", void 0);
_ts_decorate3([
  ManyToOne2(() => User, (user) => user.accounts),
  _ts_metadata3("design:type", typeof User === "undefined" ? Object : User)
], Account.prototype, "user", void 0);
_ts_decorate3([
  ManyToOne2(() => Bank, (bank) => bank.accounts),
  _ts_metadata3("design:type", typeof Bank === "undefined" ? Object : Bank)
], Account.prototype, "bank", void 0);
_ts_decorate3([
  OneToMany2(() => Transaction, (t) => t.sourceAccount),
  _ts_metadata3("design:type", Array)
], Account.prototype, "transactions", void 0);
_ts_decorate3([
  CreateDateColumn(),
  _ts_metadata3("design:type", typeof Date === "undefined" ? Object : Date)
], Account.prototype, "createdAt", void 0);
Account = _ts_decorate3([
  Entity3({
    name: "accounts"
  })
], Account);

// app/infrastructure/datasources/databases/typeorm/models/user.ts
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
var User = class {
  static {
    __name(this, "User");
  }
  id;
  name;
  email;
  passwordHash;
  accounts;
  createdAt;
};
_ts_decorate4([
  PrimaryGeneratedColumn3(),
  _ts_metadata4("design:type", Number)
], User.prototype, "id", void 0);
_ts_decorate4([
  Column3({
    type: "text"
  }),
  _ts_metadata4("design:type", String)
], User.prototype, "name", void 0);
_ts_decorate4([
  Column3({
    type: "text",
    unique: true
  }),
  _ts_metadata4("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate4([
  Column3({
    type: "text",
    name: "password_hash"
  }),
  _ts_metadata4("design:type", String)
], User.prototype, "passwordHash", void 0);
_ts_decorate4([
  OneToMany3(() => Account, (account) => account.user, {
    onDelete: "CASCADE"
  }),
  _ts_metadata4("design:type", Array)
], User.prototype, "accounts", void 0);
_ts_decorate4([
  CreateDateColumn2(),
  _ts_metadata4("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "createdAt", void 0);
User = _ts_decorate4([
  Entity4({
    name: "users"
  })
], User);
export {
  User
};
//# sourceMappingURL=user.mjs.map