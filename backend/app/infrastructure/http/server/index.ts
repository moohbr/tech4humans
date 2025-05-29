import { errorHandler } from "@infrastructure/http/middlewares";
import { V1Router } from "@infrastructure/http/routes/v1";
import { logger, logWithContext, morganStream } from "@infrastructure/logger";
import express, { Request, Response, NextFunction, Router } from "express";
import morgan from "morgan";
import { Server as HttpServer } from "http";
// import swaggerUi from 'swagger-ui-express'
// import swaggerJSDoc from 'swagger-jsdoc'
// import compression from 'compression'
// import session from 'express-session'
// import rateLimit from 'express-rate-limit'
import { AppDataSource as database } from "@infrastructure/datasources/databases/typeorm";
import { DatabaseConnectionError } from "@errors/database/database-connection-error";
import { IServer } from "@infrastructure/http/server/interfaces";

export class Server implements IServer {
  public readonly app: express.Express;
  private readonly config: ServerConfig;
  private readonly router: Router;
  private httpServer: HttpServer | null = null;
  private isShuttingDown = false;
  private timer: NodeJS.Timeout | null = null;

  constructor(config: ServerConfig) {
    this.config = config;
    this.app = express();
    this.router = express.Router();
  }

  private async init(): Promise<void> {
    try {
      await this.initializeDatabase();
      this.setupRateLimit();
      this.setupMiddlewares();
      this.setupRoutes();
      this.setupSwagger();
      // Error handlers must be setup last
      this.setupErrorHandlers();
    } catch (error) {
      logger.error("Failed to initialize server:", error);
      throw error;
    }
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await database.initialize();
      logWithContext.database("Database connection established", {
        database: database.options.database,
      });
    } catch (error) {
      logWithContext.error("Failed to connect to database", error as Error);
      throw new DatabaseConnectionError();
    }
  }

  private setupSwagger(): void {
    // const options: swaggerJSDoc.Options = {
    //   definition: {
    //     openapi: '3.0.0',
    //     info: {
    //       title: 'AWSA Reforged',
    //       version: '1.0.0',
    //       description: 'AWSA Reforged API',
    //     },
    //     components: {
    //       securitySchemes: {
    //         bearerAuth: {
    //           type: "http",
    //           scheme: "bearer",
    //           bearerFormat: "JWT",
    //         },
    //       },
    //     },
    //     security: [
    //       {
    //         bearerAuth: [],
    //       },
    //     ],
    //   },
    //   apis: [
    //     './app/infrastructure/http/routes/*/*.ts',
    //     './app/infrastructure/http/routes/*/*/*.ts',
    //     './app/infrastructure/http/routes/*/*/*/*.ts',
    //   ],
    // };
    // const swaggerSpec = swaggerJSDoc(options);
    // this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private setupErrorHandlers(): void {
    this.app.use(errorHandler);
  }

  private setupRateLimit(): void {
    // const limiter = rateLimit({
    //   store: new RedisStoreRateLimit({
    //     sendCommand: (...args: string[]) => redis.sendCommand(args),
    //     prefix: 'rate-limit:',
    //   }),
    //   validate: {
    //     xForwardedForHeader: false
    //   },
    //   windowMs: 60 * 1000,
    //   limit: 60,
    //   message: 'Too many requests from this User or IP, please try again in a minute!',
    //   skipFailedRequests: true,
    //   statusCode: 429,
    // });
    // this.app.use(limiter);
  }

  private setupCors(): void {
    this.app.use((req: Request, res: Response, next: NextFunction): void => {
      res.header("Access-Control-Allow-Origin", "https://speckead.com.br");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH",
      );
      res.header(
        "Access-Control-Allow-Headers",
        [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Authorization",
          "token",
          "hx-request",
          "hx-target",
          "hx-trigger",
        ].join(", "),
      );
      res.header("Access-Control-Allow-Credentials", "true");

      if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
      }

      next();
    });
  }

  public async start(): Promise<void> {
    try {
      await this.init();

      this.httpServer = this.app.listen(
        this.config.port,
        this.config.address,
        () => {
          logWithContext.server("Server started successfully", {
            address: this.config.address,
            port: this.config.port,
            environment: process.env.NODE_ENV || "development",
            pid: process.pid,
          });
        },
      );

      this.httpServer.on("error", (err: Error) => {
        logWithContext.error("Server error occurred", err);
        this.shutdown();
      });

      this.setupGracefulShutdown();
    } catch (error) {
      logWithContext.error("Failed to start server", error as Error);
      this.shutdown();
      throw error;
    }
  }

  private setupGracefulShutdown(): void {
    const gracefulShutdown = (signal: string) => {
      if (this.isShuttingDown) {
        logWithContext.server(
          `Received ${signal} during shutdown, ignoring...`,
        );
        return;
      }

      logWithContext.server(`Received ${signal}, starting graceful shutdown`);
      this.gracefulShutdown();
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  }

  private async gracefulShutdown(): Promise<void> {
    if (this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;
    this.timer = setTimeout(() => {
      logWithContext.server("Graceful shutdown timed out");
      process.exit(1);
    }, 10000);

    logWithContext.server("Starting graceful shutdown");

    try {
      // Close HTTP server
      if (this.httpServer && this.httpServer.listening) {
        await new Promise<void>((resolve, reject) => {
          this.httpServer!.close((err) => {
            if (err) {
              logWithContext.error("Error closing HTTP server", err);
              reject(err);
            } else {
              logWithContext.server("HTTP server closed");
              resolve();
            }
          });
        });
      } else {
        logWithContext.server("HTTP server was not running");
      }

      // Close database connection
      if (database.isInitialized) {
        await database.destroy();
        logWithContext.database("Database connection closed");
      }

      logWithContext.server("Graceful shutdown completed");
      process.exit(0);
    } catch (error) {
      logWithContext.error("Error during graceful shutdown", error as Error);
      process.exit(1);
    }
  }

  private setupRoutes(): void {
    const v1Router = V1Router.getInstance().getRouter();
    this.router.use("/v1", v1Router);
    this.app.use("/api", this.router);
  }

  private setupMiddlewares(): void {
    this.app.use(morgan("combined", { stream: morganStream }));

    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.setupCors();
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers(): void {
    process.on("uncaughtException", (error: Error) => {
      logger.error("Uncaught Exception:", error);
      this.gracefulShutdown();
    });

    process.on(
      "unhandledRejection",
      (reason: unknown, promise: Promise<unknown>) => {
        logger.error("Unhandled Rejection at:", promise, "reason:", reason);
      },
    );
  }

  shutdown(): void {
    logger.info("Force shutting down server");
    process.exit(1);
  }
}
