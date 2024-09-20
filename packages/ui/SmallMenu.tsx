import { Menu, MenuProps } from "@mui/material";
import { theme } from "./ThemeProvider";

export const SmallMenu = (props: MenuProps) => {
  return (
    <Menu
      PaperProps={{
        elevation: 10,
        style: {
          width: "166px",
          // transform: "translateX(60px) translateY(0px)",
        },
        sx: {
          overflow: "visible",
          border: `1px solid ${theme.palette.secondary_shades[400]}`,
          borderRadius: "8px",
          mt: 1.5,
          fontSize: "12px",
          "& .MuiSvgIcon-root": {
            fill: theme.palette.secondary_shades[500],
            width: "16px",
            height: "16px",
            minWidth: "24px",
          },
          // "&:hover": {
          //   "& .MuiSvgIcon-root": {
          //     fill: theme.palette.primary.main,
          //   },
          // },
          // "& .MuiSvgIcon-root &:hover": {
          //   fill: theme.palette.primary.main,
          // },
          // "& .MuiDivider-root": {
          //   borderColor: theme.palette.secondary_shades[400],
          //   margin: "0 !important",
          // },
          "& .MuiButtonBase-root": {
            fontSize: "12px",
          },
          "& .MuiMenuItem-root": {
            padding: "16px",
            "&:hover": {
              svg: {
                fill: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            },
            "& .MuiSvgIcon-root &:hover": {
              fill: theme.palette.primary.main,
              color: theme.palette.primary.main,
            },
          },
          "& .MuiList-root": {
            padding: 0,
            ">:first-child": {
              borderBottom: `0.5px solid ${theme.palette.secondary_shades[400]}`,
              "&:hover": {
                borderBottom: `0.5px solid ${theme.palette.primary.main}`,
                background: theme.palette.mix_shades[200],
              },
            },
            ">:first-child:hover + li": {
              borderTop: `0.5px solid ${theme.palette.primary.main}`,
            },
            ">:not(:first-child):not(:last-child)": {
              borderTop: `0.5px solid ${theme.palette.secondary_shades[400]}`,
              borderBottom: `0.5px solid ${theme.palette.secondary_shades[400]}`,
              "&:hover": {
                borderTop: `0.5px solid ${theme.palette.primary.main}`,
                borderBottom: `0.5px solid ${theme.palette.primary.main}`,
                background: theme.palette.mix_shades[200],
              },
            },
            ">:last-child": {
              borderTop: `0.5px solid ${theme.palette.secondary_shades[400]}`,
              "&:hover": {
                borderTop: `0.5px solid ${theme.palette.primary.main}`,
                background: theme.palette.mix_shades[200],
              },
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      {...props}
    />
  );
};
