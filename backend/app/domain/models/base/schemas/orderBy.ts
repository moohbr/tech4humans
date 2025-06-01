import { z } from "zod";
import { OrderByType } from "../entities/orderBy/enum";

export class OrderBySchemas {
  public static readonly orderBySchema = z
    .nativeEnum(OrderByType)
    .default(OrderByType.ASC);
}