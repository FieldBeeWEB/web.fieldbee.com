import { t } from "i18next";
import { SingleWordsTranslationKeys } from "../localization";
import { MapOutlined } from "@fieldbee/ui/icons";
import TasksIcon from "@fieldbee/ui/custom-icons/TasksIcon";
import DashboardIcon from "@fieldbee/ui/custom-icons/DashboardIcon";
import { pagePaths } from "../config/page-paths";
import { ElementType } from "react";

interface IMenuItem {
  title: string;
  icon: ElementType;
  path: string;
}

export const MenuList: IMenuItem[] = [
  {
    title: t(SingleWordsTranslationKeys.Dashboard),
    icon: DashboardIcon,
    path: pagePaths.authPages.dashboard,
  },
  {
    title: t(SingleWordsTranslationKeys.Map),
    icon: MapOutlined,
    path: pagePaths.authPages.map,
  },
  // {
  //   title: t(SingleWordsTranslationKeys.Fields),
  //   icon: FieldsIcon,
  //   path: pagePaths.authPages.fields,
  // },
  {
    title: t(SingleWordsTranslationKeys.Tasks),
    icon: TasksIcon,
    path: pagePaths.authPages.tasks,
  },
];
