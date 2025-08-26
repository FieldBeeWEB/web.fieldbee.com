import { Loader, Stack, theme } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";

interface IWidgetLoader {
  text: string;
  size?: number;
  stackMargin?: string;
  loaderMargin?: string;
}

const WidgetLoader = ({
  text,
  size = 160,
  stackMargin,
  loaderMargin = "0 auto",
}: IWidgetLoader) => {
  return (
    <Stack
      gap={1.5}
      spacing={0}
      margin={stackMargin}
      height={"100%"}
      minHeight={200}
      justifyContent={"center"}
    >
      <Loader size={size} margin={loaderMargin} />
      <Typography
        variant="body1"
        marginX="auto"
        color={theme.palette.surface_emphasis.medium}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default WidgetLoader;
