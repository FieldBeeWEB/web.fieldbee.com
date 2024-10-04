import { Typography } from "@fieldbee/ui/components";
import { Stack, theme } from "@fieldbee/ui";
import EmptyFolder from "@fieldbee/ui/custom-icons/EmptyFolder";

interface IWidgetEmptyData {
  title: string;
  errorMsg: string;
}

const WidgetEmptyData = ({ title, errorMsg }: IWidgetEmptyData) => {
  return (
    <Stack gap={1.5} spacing={5} minHeight={290} height={"100%"}>
      <Typography
        sx={{
          color: theme.palette.white[700],
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
        }}
      >
        {title}
      </Typography>
      <Stack justifyContent={"center"}>
        <EmptyFolder
          sx={{
            width: 164,
            height: 164,
            margin: "0 auto",
          }}
        />
        <Typography
          sx={{
            color: theme.palette.white[700],
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          {errorMsg}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default WidgetEmptyData;
