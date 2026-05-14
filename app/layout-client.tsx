'use client';

import { CssBaseline, ThemeProvider, alpha, createTheme } from "@mui/material";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f4c81",
      light: "#4f86c6",
      dark: "#072d4d",
    },
    secondary: {
      main: "#c58b2c",
      light: "#e7b85d",
      dark: "#8a5f17",
    },
    background: {
      default: "#eef3f8",
      paper: "rgba(255,255,255,0.88)",
    },
    text: {
      primary: "#10253b",
      secondary: "#5d6d7e",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h5: {
      fontWeight: 750,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at top left, rgba(15,76,129,0.16), transparent 34%), radial-gradient(circle at top right, rgba(197,139,44,0.12), transparent 28%), linear-gradient(180deg, #f7fbff 0%, #eef3f8 38%, #edf2f7 100%)",
          minHeight: "100vh",
        },
        "*::selection": {
          backgroundColor: alpha("#0f4c81", 0.2),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(15, 76, 129, 0.08)",
          boxShadow: "0 18px 50px rgba(15, 31, 45, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 999,
          fontWeight: 700,
          paddingInline: 18,
        },
      },
    },
  },
});

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
