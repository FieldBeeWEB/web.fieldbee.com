import { Loader, theme } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import WidgetWrapper from "./widget-wrapper";

interface IWidgetWrapper {
  width?: string | number;
  title: string | number | 0 | null | undefined;
  subtitle: string;
  isLoading: boolean;
  isFetching: boolean;
}

const WidgetSummary = ({
  width,
  title,
  subtitle,
  isLoading,
  isFetching,
}: IWidgetWrapper) => {
  return (
    <WidgetWrapper width={width} minHeight={85}>
      {isLoading || isFetching ? (
        <Loader size={52} margin={"0 0 4px 0"} />
      ) : (
        <Typography
          sx={{
            fontSize: "57px",
            lineHeight: "64px",
            fontWeight: 400,
          }}
        >
          {title}
        </Typography>
      )}
      <Typography
        sx={{
          fontSize: "12px",
          lineHeight: "16px",
          fontWeight: 400,
          color: theme.palette.white[500],
          letterSpacing: "0.03rem",
        }}
      >
        {subtitle}
      </Typography>
    </WidgetWrapper>
  );
};

export default WidgetSummary;
