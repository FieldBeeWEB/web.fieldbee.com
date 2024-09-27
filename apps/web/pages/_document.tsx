import { theme } from '@fieldbee/ui'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<meta name='theme-color' content='#151515' />
				<link rel='shortcut icon' href='/static/favicon.ico' />
				<link
					rel='apple-touch-icon'
					sizes='76x76'
					href='/static/apple-touch-icon.png'
				/>
			</Head>
			<body
				style={{
					margin: 0,
					fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
					backgroundColor: theme.palette.secondary_shades[200],
				}}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
