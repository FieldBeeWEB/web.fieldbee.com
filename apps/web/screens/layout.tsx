"use client";
import { useGetProfile } from "@fieldbee/api";
import type { Navigation, SidebarFooterProps } from "@fieldbee/ui";
import {
  AppProvider as MAppProvider,
  DashboardLayout,
  Stack,
  theme,
} from "@fieldbee/ui";
import AccountDropdown from "@fieldbee/ui/AccountDropdown";
import { Link, Tooltip, Typography } from "@fieldbee/ui/components";
import ContactSupportIcon from "@fieldbee/ui/custom-icons/ContactSupportIcon";
import DashboardIcon from "@fieldbee/ui/custom-icons/DashboardIcon";
import LogoFull from "@fieldbee/ui/custom-icons/LogoFull";
import TasksIcon from "@fieldbee/ui/custom-icons/TasksIcon";
import { MapOutlined } from "@fieldbee/ui/icons";
import LanguageDropdown from "@fieldbee/ui/LanguageDropdown";
import { t } from "i18next";
import { useRouter } from "next/router";
import React from "react";

import { navigationPagePaths } from "../config/page-paths";
import { getUserToken } from "../helpers/user-token";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../localization";

type StyleObject = Record<
  string,
  { backgroundColor: string; "& svg, span": { color: string } }
>;

export default function Layout({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const router = useRouter();

  React.useEffect(() => {
    const token = getUserToken();
    if (token) setIsLoggedIn(true);
  }, [router]);

  const links = [
    { path: "dashboard", href: "/dashboard" },
    { path: "map", href: "/map" },
    { path: "fields", href: "/map" },
    { path: "task", href: "/tasks" },
  ];

  const selectedPathStyles: StyleObject = links.reduce((acc, link) => {
    acc[`& a[href="${link.href}"]`] = {
      backgroundColor: router.pathname.includes(link.path)
        ? theme.palette.primary_states.selected
        : "",
      "& svg, span": {
        color: router.pathname.includes(link.path)
          ? theme.palette.primary.main
          : "",
      },
    };
    return acc;
  }, {} as StyleObject);

  return (
    <MAppProvider navigation={NAVIGATION} branding={BRANDING} theme={theme}>
      <DashboardLayout
        defaultSidebarCollapsed
        slots={{
          sidebarFooter: SidebarFooter,
          toolbarActions: () => ToolbarActions(isLoggedIn),
        }}
        hideNavigation={!isLoggedIn}
        sx={{
          background: theme.palette.surface.main,
          "& .MuiListItemIcon-root > svg , .MuiListItemText-root > span": {
            color: theme.palette.surface_emphasis.medium,
          },
          "& .MuiListItem-root": {
            marginBottom: 2,
          },
          ...selectedPathStyles,
        }}
      >
        {children}
      </DashboardLayout>
    </MAppProvider>
  );
}

const SidebarFooter = ({ mini }: SidebarFooterProps) => (
  <Typography
    variant="caption"
    sx={{
      m: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textAlign: "center",
      color: theme.palette.surface_emphasis.medium,
    }}
  >
    {!mini && `© ${new Date().getFullYear()} Made with love by FieldBee `}
    <span style={{ color: theme.palette.additional.honey }}>💛</span>
  </Typography>
);

const ToolbarActions = (isLoggedIn: boolean) => {
  const { data } = useGetProfile();

  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      spacing={0}
      gap={2}
    >
      <Tooltip
        title={t(PhrasesTranslationKeys.ContactSupport).toString()}
        PopperProps={{
          sx: (theme) => ({
            "& .MuiTooltip-tooltip": {
              backgroundColor: theme.palette.surface_emphasis.medium,
              color: theme.palette.surface.main,
              lineHeight: "normal",
              marginTop: "8px !important",
            },
          }),
        }}
      >
        <Link
          color={theme.palette.primary.main}
          underline="none"
          lineHeight={0}
          href={`mailto:info@efarmer.mobi`}
          borderRadius={1}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.surface_states.hover,
            },
          }}
        >
          <ContactSupportIcon sx={{ width: "40px", height: "40px" }} />
        </Link>
      </Tooltip>
      {!isLoggedIn && <LanguageDropdown />}
      {data && <AccountDropdown firstName={data.firstName} />}
    </Stack>
  );
};

const BRANDING = {
  title: "",
  logo: <LogoFull sx={{ width: "155px", height: "40px" }} />,
};

const NAVIGATION: Navigation = [
  {
    kind: "page",
    segment: navigationPagePaths.dashboard,
    title: t(SingleWordsTranslationKeys.Dashboard)?.toString(),
    icon: <DashboardIcon />,
  },
  {
    kind: "page",
    segment: navigationPagePaths.map,
    title: t(SingleWordsTranslationKeys.Map)?.toString(),
    icon: <MapOutlined />,
  },
  {
    kind: "page",
    segment: navigationPagePaths.tasks,
    title: t(SingleWordsTranslationKeys.Tasks)?.toString(),
    icon: <TasksIcon />,
  },
];
