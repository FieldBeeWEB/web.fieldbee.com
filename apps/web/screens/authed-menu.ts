import DashboardIcon from '@fieldbee/ui/custom-icons/DashboardIcon'
import TasksIcon from '@fieldbee/ui/custom-icons/TasksIcon'
import { MapOutlined } from '@fieldbee/ui/icons'
import { t } from 'i18next'
import { ElementType } from 'react'
import { pagePaths } from '../config/page-paths'
import { SingleWordsTranslationKeys } from '../localization'

interface IMenuItem {
	title: string
	icon: ElementType
	path: string
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
]
