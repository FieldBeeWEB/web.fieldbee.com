import { Tab as MTab, TabProps } from "@mui/material";

function Tab(props: TabProps) {
  return (
    <MTab
      sx={{
        minWidth: "96px",
        textTransform: "none",
        minHeight: "unset",
        height: "48px",
      }}
      {...props}
    />
  );
}

export default Tab;
