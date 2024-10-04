import { Stack, theme } from "@fieldbee/ui";
import React from "react";

interface IDashboardContainer {
  children: React.ReactNode;
}

const DashboardContainer = ({ children }: IDashboardContainer) => {
  return (
    <Stack
      marginTop={3}
      bgcolor={theme.palette.secondary_shades[300]}
      borderRadius={0.5}
      padding={1}
      spacing={1}
    >
      {children}
    </Stack>
  );
};

export default DashboardContainer;
