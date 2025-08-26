import { Stack, theme } from "@fieldbee/ui";

interface IWidgetWrapper {
  children?: React.ReactNode;
  height?: string | number;
  width?: string | number;
  gap?: string | number;
  spacing?: string | number;
  minHeight?: string | number;
  alignItems?: string;
  justifyContent?: string;
}

const WidgetWrapper = ({
  height,
  width,
  children,
  gap,
  spacing,
  minHeight,
  alignItems,
  justifyContent,
}: IWidgetWrapper) => {
  return (
    <Stack
      bgcolor={theme.palette.elevation_overlay["02dp"]}
      direction={"column"}
      height={height}
      padding={1.5}
      gap={gap || 0.25}
      borderRadius={1}
      spacing={spacing || 0.25}
      width={width}
      minHeight={minHeight}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {children}
    </Stack>
  );
};

export default WidgetWrapper;
