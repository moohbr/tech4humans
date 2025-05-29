import { Router } from "express";

export class RouterFactory {
  public static createRouter(config: RouterConfiguration = {}): Router {
    return Router({
      mergeParams: config.mergeParams ?? true,
      caseSensitive: config.caseSensitive ?? true,
      strict: config.strict ?? true,
    });
  }

  public static createStandardRouter(): Router {
    return this.createRouter({
      mergeParams: true,
      caseSensitive: true,
      strict: true,
    });
  }
}
