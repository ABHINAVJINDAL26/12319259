import type { Metadata } from "next";
import "./globals.css";
import { LayoutClient } from "./layout-client";

export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Priority notification system for campus students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
