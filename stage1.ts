import Log from "./logging_middleware/index.js";

const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhYmhpbmF2amluZGFsMjNAbHB1LmluIiwiZXhwIjoxNzc4NzYwODY5LCJpYXQiOjE3Nzg1OTk5NjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiNjJmOTc5Mi05NTI0LTQyNWUtODhjZC1lNWY5MDE3NjA3MDMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhYmhpbmF2IGppbmRhbCIsInN1YiI6IjRhMTcwMDgxLTE3YjQtNGZhOC1hMWRkLTYxNTU4NzgwYTRlYiJ9LCJlbWFpbCI6ImFiaGluYXZqaW5kYWwyM0BscHUuaW4iLCJuYW1lIjoiYWJoaW5hdiBqaW5kYWwiLCJyb2xsTm8iOiIxMjMxOTI1OSIsImFjY2Vzc0NvZGUiOiJUUnZaV3EiLCJjbGllbnRJRCI6IjRhMTcwMDgxLTE3YjQtNGZhOC1hMWRkLTYxNTU4NzgwYTRlYiIsImNsaWVudFNlY3JldCI6IktZVWhRY0hCakNUVmpHdUgifQ.ID4b0YcL3hj1CyjAH5PFq7gKYbVdRnZ6GavMgfTr0FY";
const BASE_URL = "http://localhost:3000/api";

const WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const fetchAllNotifications = async (): Promise<Notification[]> => {
  await Log("frontend", "info", "api", "Fetching all notifications for priority inbox");

  const response = await fetch(`${BASE_URL}/notifications`, {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
  });

  if (!response.ok) {
    await Log("frontend", "error", "api", `Notification fetch failed: ${response.status}`);
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();
  await Log("frontend", "debug", "api", `Total notifications fetched: ${data.notifications.length}`);
  return data.notifications;
};

const getTopNPriorityNotifications = async (topN: number = 10): Promise<Notification[]> => {
  await Log("frontend", "info", "utils", `Calculating top ${topN} priority notifications`);

  const notifications = await fetchAllNotifications();

  const scored = notifications.map((n) => {
    const weight = WEIGHTS[n.Type] || 0;
    const recency = new Date(n.Timestamp).getTime();
    const score = weight * 1_000_000_000_000 + recency;
    return { ...n, score };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);
  const top = sorted.slice(0, topN);

  await Log("frontend", "info", "utils", `Top ${topN} priority notifications calculated`);
  return top;
};

// Run karo
(async () => {
  try {
    const top10 = await getTopNPriorityNotifications(10);
    console.log("Top 10 Priority Notifications:");
    console.log(JSON.stringify(top10, null, 2));
  } catch (error) {
    console.error("Error running stage 1:", error);
  }
})();
