import { Notification } from "./api";

const WEIGHTS: Record<string, number> = {
  "Placement": 3,
  "Result": 2,
  "Event": 1,
};

export const calculateScore = (notification: Notification): number => {
  const weight = WEIGHTS[notification.Type] || 0;
  const timestamp = new Date(notification.Timestamp).getTime();
  return weight * 1e13 + timestamp;
};

export const sortByPriority = (notifications: Notification[]): Notification[] => {
  return [...notifications].sort((a, b) => {
    const scoreA = calculateScore(a);
    const scoreB = calculateScore(b);
    return scoreB - scoreA;
  });
};

export const getTypeColor = (type: string): "error" | "warning" | "success" | "info" => {
  switch (type) {
    case "Placement":
      return "error";
    case "Result":
      return "warning";
    case "Event":
      return "success";
    default:
      return "info";
  }
};

export const getTypeLabel = (type: string): string => {
  switch (type) {
    case "Placement":
      return "💼 Placement";
    case "Result":
      return "📊 Result";
    case "Event":
      return "📅 Event";
    default:
      return type;
  }
};
