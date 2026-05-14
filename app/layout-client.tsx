'use client';

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
