import Log from "../logging_middleware/index";

const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN || "";
const BASE_URL = "http://4.224.186.213/evaluation-service";

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

(async () => {
  try {
    const top10 = await getTopNPriorityNotifications(10);
    console.log("Top 10 Priority Notifications:");
    console.log(JSON.stringify(top10, null, 2));
  } catch (error) {
    console.error("Error running stage 1:", error);
  }
})();
