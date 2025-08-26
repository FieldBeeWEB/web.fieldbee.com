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
        <Loader size={56} margin={"0 0 4px 0"} borderWidth={4} />
      ) : (
        <Typography variant="h3" color={theme.palette.surface_emphasis.high}>
          {title}
        </Typography>
      )}
      <Typography
        variant="caption"
        color={theme.palette.surface_emphasis.medium}
      >
        {subtitle}
      </Typography>
    </WidgetWrapper>
  );
};

export default WidgetSummary;
