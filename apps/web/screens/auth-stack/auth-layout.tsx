import { Stack } from "@fieldbee/ui";
import { Grid } from "@fieldbee/ui/components";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

const AuthLayout: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();

  return (
    <Grid
      container
      sx={{
        backgroundColor: (t) => t.palette.background.default,
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={12}
        sm={7}
        height="100%"
        sx={{
          backgroundColor: (t) => t.palette.background.default,
          position: "relative",
        }}
      >
        <Image
          fill
          src={"/login-image.webp"}
          alt="Login image"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Stack
          justifyContent="center"
          alignItems="center"
          height="calc(100% - 32px)"
          padding="80px"
          position="relative"
        >
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
