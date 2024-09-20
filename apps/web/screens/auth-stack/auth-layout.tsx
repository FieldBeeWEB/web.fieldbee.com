import { Stack } from "@fieldbee/ui";
import {
  Box,
  FormControl,
  Grid,
  Link,
  MenuItem,
  Select,
  Typography
} from "@fieldbee/ui/components";
import BackArrowIcon from "@fieldbee/ui/custom-icons/BackArrowIcon";
import EnglishFlag from "@fieldbee/ui/custom-icons/EnglishFlag";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../config/page-paths";

type Props = {
  headline?: string;
  supportingText?: string;
  displayBackButton?: boolean;
} & React.PropsWithChildren;

const AuthLayout: React.FunctionComponent<Props> = ({
  headline,
  supportingText,
  displayBackButton,
  children,
}) => {
  const router = useRouter();

  return (
    <Grid
      container
      sx={{
        backgroundColor: (t) => t.palette.secondary_shades[200],
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        height="100%"
        sx={{
          backgroundColor: (t) => t.palette.secondary.main,
        }}
      >
        <Stack
          justifyContent="center"
          padding="16px 48px"
          height="calc(100% - 32px)"
          gap="16px"
        >
          <Stack flex={1} justifyContent="flex-end">
            <Image src="logo.svg" alt="FieldBee" width={32} height={32} />
            <Typography
              variant="h5"
              marginTop={16}
              color={(t) => t.palette.white[900]}
              //maxWidth="16ch"
              lineHeight="32px"
            >
              {headline}
            </Typography>
            {!!supportingText && (
              <Stack marginTop={0}>
                <Typography variant="body2" color={(t) => t.palette.white[700]}>
                  {supportingText ??
                    "A simple and affordable tractor gps navigation and auto steering system for your farm"}
                </Typography>
              </Stack>
            )}
          </Stack>

          <Stack
            flex={1}
            alignSelf="flex-start"
            justifyContent="flex-end"
            padding="8px"
          >
            {!!displayBackButton && (
              <Link
                component="button"
                variant="body2"
                onClick={() => router.push(pagePaths.publicPages.login)}
                borderRadius="100px !important"
                border="1px solid #fff !important"
                padding="12px !important"
                lineHeight="normal"
              >
                <BackArrowIcon />
              </Link>
            )}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack
          justifyContent="center"
          alignItems="center"
          height="calc(100% - 32px)"
          padding="16px 24px"
          position="relative"
        >
          <Box position={"absolute"} right={24} top={16} minWidth={166}>
            <FormControl fullWidth>
              <Select
                value="English"
                MenuProps={{
                  PaperProps: {
                    sx: (theme) => ({
                      "& .MuiMenuItem-root": {
                        border: "1px solid transparent",
                        borderWidth: "1px 0px",
                      },
                      "& .Mui-selected": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: `${theme.palette.mix.main} !important`,
                      },
                      "& .MuiMenuItem-root:hover": {
                        borderColor: theme.palette.primary_shades[500],
                        backgroundColor: theme.palette.mix_shades[200],
                      },
                    }),
                  },
                }}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "12px 16px !important",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <MenuItem value="English">
                  <EnglishFlag />
                  English
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
