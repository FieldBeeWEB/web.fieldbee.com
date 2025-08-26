import { Stack } from "@fieldbee/ui";
import React from "react";

interface IDashboardContainer {
  children: React.ReactNode;
}

const DashboardContainer = ({ children }: IDashboardContainer) => {
  return (
    <Stack marginTop={3} spacing={2}>
      {children}
    </Stack>
  );
};

export default DashboardContainer;
