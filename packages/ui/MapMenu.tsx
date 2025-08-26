import { Menu, MenuProps, Stack } from "@mui/material";
import { theme } from "./ThemeProvider";

export const MapMenu = ({ children, ...props }: MenuProps) => {
  return (
    <Menu
      PaperProps={{
        elevation: 10,
        style: {
          transform: "translateX(-64px) translateY(0)",
        },
        sx: {
          overflow: "visible",
          borderRadius: "4px",
          padding: "16px",
          background: theme.palette.elevation_overlay["03dp"],
          "& .MuiList-root": {
            padding: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
      {...props}
    >
      <Stack direction="row" spacing={1}>
        {children}
      </Stack>
    </Menu>
  );
};
