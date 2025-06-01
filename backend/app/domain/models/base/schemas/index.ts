import { PageSchemas } from "./page";
import { LimitSchemas } from "./limit";
import { OrderBySchemas } from "./orderBy";

export class BaseSchemas {
  public static readonly pageSchema = PageSchemas.pageSchema;
  public static readonly limitSchema = LimitSchemas.limitSchema;
  public static readonly orderBySchema = OrderBySchemas.orderBySchema;
}