const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpbmF2amluZGFsMjNAbHB1LmluIiwiZXhwIjoxNzc4NzYwODY5LCJpYXQiOjE3Nzg1OTk5NjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiNjJmOTc5Mi05NTI0LTQyNWUtODhjZC1lNWY5MDE3NjA3MDMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhYmhpbmF2IGppbmRhbCIsInN1YiI6IjRhMTcwMDgxLTE3YjQtNGZhOC1hMWRkLTYxNTU4NzgwYTRlYiJ9LCJlbWFpbCI6ImFiaGluYXZqaW5kYWwyM0BscHUuaW4iLCJuYW1lIjoiYWJoaW5hdiBqaW5kYWwiLCJyb2xsTm8iOiIxMjMxOTI1OSIsImFjY2Vzc0NvZGUiOiJUUnZaV3EiLCJjbGllbnRJRCI6IjRhMTcwMDgxLTE3YjQtNGZhOC1hMWRkLTYxNTU4NzgwYTRlYiIsImNsaWVudFNlY3JldCI6IktZVWhRY0hCakNUVmpHdUgifQ.ID4b0YcL3hj1CyjAH5PFq7gKYbVdRnZ6GavMgfTr0FY";
const LOG_API = "http://localhost:3000/api/logs";

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
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    if (!response.ok) {
      return;
    }
  } catch {
    return;
  }
};

export default Log;
