import { Card as MCard, CardProps, styled } from "@mui/material";

const Card = styled(MCard)(({ theme }) => ({
  paddingTop: "32px",
  paddingBottom: "32px",
  paddingInlineStart: "40px",
  paddingInlineEnd: "40px",
  width: "calc(100% - 80px)",
}));

export const MainCard = (props: CardProps) => {
  return <Card {...props} />;
};
