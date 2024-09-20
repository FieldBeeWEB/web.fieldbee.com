import { Stack, StackProps } from "@mui/material";

type Props = {
  active?: boolean;
  src: string;
  alt: string;
} & StackProps;

export const ImageButton = ({ active, src, alt, ...props }: Props) => {
  return (
    <Stack
      sx={(theme) => ({
        height: "35px",
        width: "35px",
        // position: "absolute",
        cursor: "pointer",
        // top: "16px",
        // left: "16px",
        background: theme.palette.secondary_shades[200],
        // zIndex: 10,
        fontSize: "14px",
        borderRadius: "4px",
        backgroundColor: "transparent",
        border: active
          ? `1px solid ${theme.palette.primary.main}`
          : "1px solid transparent",
      })}
      spacing="8"
      direction="row"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <img
        style={{ borderRadius: "4px", width: "32px", height: "32px" }}
        src={src}
        alt={alt}
      />
    </Stack>
  );
};
