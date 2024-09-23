import {
  ContentWrapper,
  DashboardLayout,
  NavButton,
  Sidebar,
  SmallMenu,
  Stack,
} from "@fieldbee/ui";
import { ListItemIcon, MenuItem, Typography } from "@fieldbee/ui/components";
import AccountOutlinedIcon from "@fieldbee/ui/custom-icons/AccountOutlinedIcon";
import FieldsIcon from "@fieldbee/ui/custom-icons/FieldsIcon";
import { AccountCircleOutlined, Logout, MapOutlined } from "@fieldbee/ui/icons";
import { t } from "i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../config/page-paths";
import { getUserToken } from "../helpers/user-token";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../localization";
import Settings from "./settings";
import TasksIcon from "@fieldbee/ui/custom-icons/TasksIcon";

export default function AuthedLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();

  React.useEffect(() => {
    const token = getUserToken();
    if (!token) {
      router.push(pagePaths.publicPages.login);
    }
  }, [router]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSettings, setOpenSettings] = React.useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  return (
    <DashboardLayout>
      <Sidebar>
        <NavButton
          onClick={() => {
            router.push(pagePaths.authPages.home);
          }}
        >
          <Image src="/logo.svg" alt="FieldBee" width={35} height={35} />
        </NavButton>
        <Stack>
          <NavButton
            startIcon={<MapOutlined />}
            onClick={() => {
              router.push(pagePaths.authPages.map);
            }}
            active={router.pathname === pagePaths.authPages.map}
          >
            {t(SingleWordsTranslationKeys.Map)}
          </NavButton>
          <NavButton
            startIcon={<FieldsIcon />}
            onClick={() => {
              router.push(pagePaths.authPages.fields);
            }}
            active={router.pathname.includes(pagePaths.authPages.fields)}
          >
            {t(SingleWordsTranslationKeys.Fields)}
          </NavButton>
          <NavButton
            startIcon={<TasksIcon />}
            onClick={() => {
              router.push(pagePaths.authPages.tasks);
            }}
            active={router.pathname.includes(pagePaths.authPages.tasks)}
          >
            {t(SingleWordsTranslationKeys.Tasks)}
          </NavButton>
        </Stack>
        <Stack>
          <Typography variant="caption" textAlign={"center"}>
            PoC v3.0
          </Typography>
          <NavButton
            startIcon={<AccountOutlinedIcon />}
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {t(SingleWordsTranslationKeys.Account)}
          </NavButton>
          <SmallMenu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem
              onClick={() => {
                router.push(pagePaths.logout);
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {t(SingleWordsTranslationKeys.Logout)}
            </MenuItem>
            {/* <Divider /> */}
            <MenuItem onClick={handleOpenSettings}>
              <ListItemIcon>
                <AccountCircleOutlined fontSize="small" />
              </ListItemIcon>
              {t(PhrasesTranslationKeys.EditProfile)}
            </MenuItem>
          </SmallMenu>
        </Stack>
      </Sidebar>
      <ContentWrapper>{children}</ContentWrapper>
      <Settings open={openSettings} handleClose={handleCloseSettings} />
    </DashboardLayout>
  );
}
