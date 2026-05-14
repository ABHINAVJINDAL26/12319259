import Log from '@/lib/logger';

const API_URL = '/api';

export interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

export interface FetchNotificationsParams {
  limit?: number;
  page?: number;
  notification_type?: string;
}

export const fetchNotifications = async (
  params?: FetchNotificationsParams
): Promise<Notification[]> => {
  await Log("frontend", "info", "api", `Fetching notifications - limit:${params?.limit} page:${params?.page} type:${params?.notification_type}`);

  try {
    const queryParams = new URLSearchParams();
    
    if (params?.limit) queryParams.append("limit", String(params.limit));
    if (params?.page) queryParams.append("page", String(params.page));
    if (params?.notification_type && params.notification_type !== 'all') {
      queryParams.append("notification_type", params.notification_type);
    }

    const url = `${API_URL}/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      await Log("frontend", "error", "api", `API Error: ${response.status}`);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    await Log("frontend", "debug", "api", `Successfully fetched ${data.notifications?.length} notifications`);
    return data.notifications || [];
  } catch (error) {
    await Log("frontend", "fatal", "api", `Notifications fetch failed: ${error}`);
    console.error("Failed to fetch notifications:", error);
    throw error;
  }
};

export const fetchPriorityNotifications = async (
  topN: number = 10,
  typeFilter: string = 'all'
): Promise<Notification[]> => {
  await Log("frontend", "info", "api", `Fetching priority notifications - topN:${topN} type:${typeFilter}`);
  try {
    const params: FetchNotificationsParams = {};
    if (typeFilter !== 'all') {
        params.notification_type = typeFilter;
    }
    const notifications = await fetchNotifications(params);
    
    const WEIGHTS: Record<string, number> = {
      "Placement": 3,
      "Result": 2,
      "Event": 1,
    };

    const scored = notifications.map((n) => ({
      ...n,
      score: (WEIGHTS[n.Type] || 0) * 1e13 + new Date(n.Timestamp).getTime(),
    }));

    const sorted = scored.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, topN);
    await Log("frontend", "debug", "api", `Successfully returned top ${topN} priority notifications`);
    return top;
  } catch (error) {
    await Log("frontend", "error", "api", `Priority notifications fetch failed: ${error}`);
    console.error("Failed to fetch priority notifications:", error);
    throw error;
  }
};
