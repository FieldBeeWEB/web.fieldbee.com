import { ThemeProvider as MThemeProvider } from "@mui/material";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface Palette {
    mix: Palette["primary"];
    link: Palette["primary"];
    primary_shades: Partial<Palette["grey"]>;
    secondary_shades: Partial<Palette["grey"]>;
    mix_shades: Partial<Palette["grey"]>;
    white: Partial<Palette["grey"]>;
  }
  interface PaletteOptions {
    mix: PaletteOptions["primary"];
    link: PaletteOptions["primary"];
    primary_shades: Partial<Palette["grey"]>;
    secondary_shades: Partial<Palette["grey"]>;
    mix_shades: Partial<Palette["grey"]>;
    white: Partial<Palette["grey"]>;
  }
}

export const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD833",
    },
    primary_shades: {
      200: "#FFDC51",
      300: "#FFE06A",
      400: "#FFE581",
      500: "#FFE996",
      600: "#FFEDAB",
    },
    secondary: {
      main: "#151515",
    },
    secondary_shades: {
      200: "#2A2A2A",
      300: "#414141",
      400: "#595959",
      500: "#727272",
      600: "#8D8D8D",
    },
    mix: {
      main: "#29251A",
    },
    link: {
      main: "#CAC4D0",
    },
    mix_shades: {
      200: "#3D392F",
      300: "#534F45",
      400: "#69665D",
      500: "#817D76",
      600: "#999690",
    },
    white: {
      900: "rgba(255, 255, 255, 0.9)",
      800: "rgba(255, 255, 255, 0.8)",
      700: "rgba(255, 255, 255, 0.7)",
      600: "rgba(255, 255, 255, 0.6)",
      500: "rgba(255, 255, 255, 0.5)",
      400: "rgba(255, 255, 255, 0.4)",
      300: "rgba(255, 255, 255, 0.3)",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.white[800],
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.secondary_shades[300],
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.link.main,
        }),
      },
    },
  },
} as ThemeOptions);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  return <MThemeProvider theme={theme}>{children}</MThemeProvider>;
};
