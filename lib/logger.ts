/**
 * Logging Middleware - Re-exported from logging_middleware package
 * This file acts as a bridge so the Next.js app can import Log from a local path.
 * The actual logic mirrors logging_middleware/index.ts exactly.
 */

const LOG_API = "/api/logs";

type Stack = "frontend" | "backend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type FrontendPackage = "api" | "component" | "hook" | "page" | "state" | "style";
type CommonPackage = "auth" | "config" | "middleware" | "utils";
type Package = FrontendPackage | CommonPackage;

const Log = async (
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> => {
  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Log API Error:", response.status);
    }
  } catch (error) {
    console.error("Logging failed:", error);
  }
};

export default Log;
