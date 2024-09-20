import { Menu, MenuProps } from "@mui/material";

export const BottomMenu = (props: MenuProps) => {
  return (
    <Menu
      PaperProps={{
        elevation: 10,
        style: {
          width: "250px",
          transform: "translateX(0px) translateY(0px)",
        },
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      {...props}
    />
  );
};
