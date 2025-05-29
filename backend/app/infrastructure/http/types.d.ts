import { UserEntity } from "@models/user/entity";
import session from "express-session"; // eslint-disable-line @typescript-eslint/no-unused-vars



// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata
declare module "express-session" {
  export interface SessionData {
    user: Partial<ReturnType<UserEntity["toPersistence"]>>;
  }
}
