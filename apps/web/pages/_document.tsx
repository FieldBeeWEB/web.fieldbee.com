import {
	DocumentHeadTags,
	DocumentHeadTagsProps,
	documentGetInitialProps,
	theme,
} from '@fieldbee/ui'
import {
	DocumentContext,
	DocumentProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
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
				<DocumentHeadTags {...props} />
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

Document.getInitialProps = async (ctx: DocumentContext) => {
	const finalProps = await documentGetInitialProps(ctx)
	return finalProps
}
