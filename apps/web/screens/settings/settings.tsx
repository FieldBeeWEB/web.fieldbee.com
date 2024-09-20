import { ModalBody, ModalContent } from "@fieldbee/ui";
import { Tabs } from "@fieldbee/ui/components";
import Tab from "@fieldbee/ui/Tab";
import TabPanel from "@fieldbee/ui/TabPanel";
import { t } from "i18next";
import * as React from "react";
import { SingleWordsTranslationKeys } from "../../localization";
import AccountPanel from "../profile/account/account-panel";
import UserSettings from "./user-settings";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Settings: React.FunctionComponent<Props> = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ModalContent
      open={open}
      handleClose={handleClose}
      modalWidth="normal"
      modalHeight="large"
    >
      <ModalBody>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label={t(SingleWordsTranslationKeys.Settings).toString()}
          sx={(theme)=>({
            borderRight: 1,
            borderColor: theme.palette.secondary_shades[300],
          })}
        >
          <Tab label={t(SingleWordsTranslationKeys.Account)} />
          <Tab label={t(SingleWordsTranslationKeys.Settings)} />
        </Tabs>
        <TabPanel value={value} index={0} fixedHeight={true}>
          <AccountPanel />
        </TabPanel>
        <TabPanel value={value} index={1} fixedHeight={true}>
          <UserSettings />
        </TabPanel>
      </ModalBody>
    </ModalContent>
  );
};
export default Settings;
