'use client'
import { t } from 'i18next'
import {
	PhrasesTranslationKeys,
	SingleWordsTranslationKeys,
} from './../localization/translations'

import type { Navigation } from '@fieldbee/ui'
import DashboardIcon from '@fieldbee/ui/custom-icons/DashboardIcon'
import TasksIcon from '@fieldbee/ui/custom-icons/TasksIcon'
import {
	AccountCircleOutlined,
	Logout,
	MapOutlined,
	Settings as SettingsIcon,
} from '@fieldbee/ui/icons'
import 'react-toastify/dist/ReactToastify.css'

import { theme } from '@fieldbee/ui'

import { QueryClient, QueryClientProvider } from '@fieldbee/api'
import type { SidebarFooterProps } from '@fieldbee/ui'
import {
	DashboardLayout,
	AppProvider as MAppProvider,
	ThemeProvider,
} from '@fieldbee/ui'
import {
	FormControl,
	MenuItem,
	Select,
	Typography,
} from '@fieldbee/ui/components'
import { AdapterDateFns, LocalizationProvider } from '@fieldbee/ui/date-picker'
import i18next from 'i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css'
import translations from '../localization/translations'

import { AppCacheProvider } from '@fieldbee/ui'
import LogoShort from '@fieldbee/ui/custom-icons/LogoShort'
import ToastContainer from '@fieldbee/ui/ToastContainer'
import { useRouter } from 'next/router'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { navigationPagePaths } from '../config/page-paths'
import { getUserToken } from '../helpers/user-token'
import BackgroundDownloadProvider from '../screens/background-download/background-download'
import AppProvider from '../screens/shared/providers/app-provider'
import './../screens/map/utils/map.css'

import EnglishFlag from '@fieldbee/ui/custom-icons/EnglishFlag'

i18next.init({
	lng: 'en',
	fallbackLng: 'en',
	debug: true,
	resources: translations,
})

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
	const router = useRouter()

	React.useEffect(() => {
		const token = getUserToken()
		if (token) setIsLoggedIn(true)
	}, [router])

	return (
		<QueryClientProvider client={queryClient}>
			<AppCacheProvider>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Head>
						<title>FieldBee</title>
						<meta
							name='viewport'
							content='initial-scale=1, width=device-width'
						/>
					</Head>
					<ThemeProvider>
						<BackgroundDownloadProvider>
							<AppProvider>
								<MAppProvider
									navigation={NAVIGATION}
									branding={BRANDING}
									theme={theme}
								>
									<DashboardLayout
										defaultSidebarCollapsed
										slots={{
											sidebarFooter: SidebarFooter,
											toolbarActions: ToolbarActions,
										}}
										hideNavigation={!isLoggedIn}
									>
										<Component {...pageProps} />
									</DashboardLayout>
								</MAppProvider>
							</AppProvider>
						</BackgroundDownloadProvider>
					</ThemeProvider>
					<ToastContainer
						position='top-center'
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						closeButton={false}
						autoClose={6000}
						theme='dark'
					/>
				</LocalizationProvider>
			</AppCacheProvider>
		</QueryClientProvider>
	)
}

const SidebarFooter = ({ mini }: SidebarFooterProps) => (
	<Typography
		variant='caption'
		sx={{
			m: 1,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textAlign: 'center',
		}}
	>
		{mini
			? '💛🐝'
			: `© ${new Date().getFullYear()} Made with love by FieldBee 💛`}
	</Typography>
)

const ToolbarActions = () => (
	<FormControl fullWidth>
		<Select
			value='English'
			MenuProps={{
				PaperProps: {
					sx: theme => ({
						'& .MuiPaper-root': {
							borderRadius: '4px',
							marginTop: '8px',
							width: '200px',
							maxHeight: '352px',
							boxShadow: '0px 2px 6px 2px #00000026',
						},
						'& .MuiList-root': {
							background: theme.palette.secondary_shades[300],
						},
						'& .Mui-selected': {
							backgroundColor: `${theme.palette.secondary_shades[400]} !important`,
						},
						'& .MuiMenuItem-root': {
							padding: '16px 12px',
							'&:hover': {
								backgroundColor: theme.palette.secondary_shades[400],
							},
						},
					}),
				},
			}}
			sx={{
				'& .MuiSelect-select': {
					padding: '12px 16px !important',
					display: 'flex',
					alignItems: 'center',
					width: '125px',
				},
			}}
		>
			<MenuItem value='English'>
				<EnglishFlag />
				English
			</MenuItem>
		</Select>
	</FormControl>
)

const BRANDING = {
	title: 'FieldBee',
	logo: <LogoShort sx={{ width: 40, height: 40 }} />,
}

const NAVIGATION: Navigation = [
	{
		kind: 'page',
		segment: navigationPagePaths.dashboard,
		title: t(SingleWordsTranslationKeys.Dashboard)?.toString(),
		icon: <DashboardIcon />,
	},
	{
		kind: 'page',
		segment: navigationPagePaths.map,
		title: t(SingleWordsTranslationKeys.Map)?.toString(),
		icon: <MapOutlined />,
	},
	{
		kind: 'page',
		segment: navigationPagePaths.tasks,
		title: t(SingleWordsTranslationKeys.Tasks)?.toString(),
		icon: <TasksIcon />,
	},
	{
		kind: 'page',
		segment: navigationPagePaths.settings,
		title: t(SingleWordsTranslationKeys.Account)?.toString(),
		icon: <SettingsIcon />,
		children: [
			{
				kind: 'page',
				segment: navigationPagePaths.profile,
				title: t(PhrasesTranslationKeys.EditProfile)?.toString(),
				icon: <AccountCircleOutlined />,
			},
			{
				kind: 'page',
				segment: navigationPagePaths.logout,
				title: t(SingleWordsTranslationKeys.Logout)?.toString(),
				icon: <Logout />,
			},
		],
	},
]
