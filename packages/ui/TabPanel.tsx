import { Box } from "@mui/material";
import * as React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  fixedHeight?: boolean;
  isDark?: boolean;
}

function TabPanel(props: TabPanelProps) {
  const {
    children,
    value,
    index,
    isDark = false,
    fixedHeight = false,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{
        flex: 1,
        overflow: "auto",
      }}
      {...other}
    >
      {value === index && (
        <Box
          sx={(theme) => ({
            height: "100%",
            p: 0,
            display: "flex",
            flexDirection: "column",
            backgroundColor: isDark ? theme.palette.secondary.main : "inherit",
          })}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
