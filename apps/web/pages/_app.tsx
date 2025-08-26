'use client'

import 'react-toastify/dist/ReactToastify.css'

import { QueryClient, QueryClientProvider } from '@fieldbee/api'
import { AppCacheProvider, ThemeProvider } from '@fieldbee/ui'
import { AdapterDateFns, LocalizationProvider } from '@fieldbee/ui/date-picker'
import ToastContainer from '@fieldbee/ui/ToastContainer'
import i18next from 'i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import translations from '../localization/translations'
import BackgroundDownloadProvider from '../screens/background-download/background-download'
import AppProvider from '../screens/shared/providers/app-provider'
import './../screens/map/utils/map.css'

import React from 'react'
import Layout from '../screens/layout'

i18next.init({
	lng: 'en',
	fallbackLng: 'en',
	debug: true,
	resources: translations,
})

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [isStartedRender, setStartedRender] = React.useState<boolean>(false)

	React.useEffect(() => {
		setTimeout(() => {
			setStartedRender(true)
			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}, 1000)
	}, [])

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
								{/* {isLoading && <PageLoader />} */}
								{isStartedRender && (
									<Layout>
										<Component {...pageProps} />
									</Layout>
								)}
							</AppProvider>
						</BackgroundDownloadProvider>
					</ThemeProvider>
					<ToastContainer
						position='top-right'
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
