import { Stack, theme } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import EmptyFolder from "@fieldbee/ui/custom-icons/EmptyFolder";

interface IWidgetEmptyData {
  title: string;
  errorMsg: string;
}

const WidgetEmptyData = ({ title, errorMsg }: IWidgetEmptyData) => {
  return (
    <Stack gap={1.5} spacing={0} minHeight={290} height={"100%"}>
      <Typography
        variant="subtitle2"
        color={theme.palette.surface_emphasis.medium}
      >
        {title}
      </Typography>
      <Stack justifyContent={"center"} spacing={1.5}>
        <EmptyFolder
          sx={{
            width: 164,
            height: 164,
            margin: "0 auto !important",
          }}
        />
        <Typography
          variant="body1"
          color={theme.palette.surface_emphasis.medium}
          textAlign="center"
        >
          {errorMsg}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default WidgetEmptyData;
