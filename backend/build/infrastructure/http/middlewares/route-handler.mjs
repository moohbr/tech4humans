var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// app/infrastructure/http/middlewares/route-handler.ts
var RouteHandlerMiddleware = class {
  static {
    __name(this, "RouteHandlerMiddleware");
  }
  static asyncHandler(handler) {
    return (req, res, next) => {
      Promise.resolve(handler(req, res, next)).catch(next);
    };
  }
  static syncHandler(handler) {
    return handler;
  }
};
export {
  RouteHandlerMiddleware
};
//# sourceMappingURL=route-handler.mjs.map