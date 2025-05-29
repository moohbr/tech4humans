var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/infrastructure/http/routes/factory/index.ts
import { Router } from "express";
var RouterFactory = class {
  static {
    __name(this, "RouterFactory");
  }
  static createRouter(config = {}) {
    return Router({
      mergeParams: config.mergeParams ?? true,
      caseSensitive: config.caseSensitive ?? true,
      strict: config.strict ?? true
    });
  }
  static createStandardRouter() {
    return this.createRouter({
      mergeParams: true,
      caseSensitive: true,
      strict: true
    });
  }
};
export {
  RouterFactory
};
//# sourceMappingURL=index.mjs.map