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
        sx={{
          color: theme.palette.white[700],
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          textAlign: "center",
          marginTop: "12px",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default WidgetLoader;
