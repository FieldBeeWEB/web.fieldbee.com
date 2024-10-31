import { Stack, theme } from '@fieldbee/ui'
import { Grid, Link, Typography } from '@fieldbee/ui/components'
import BackArrowIcon from '@fieldbee/ui/custom-icons/BackArrowIcon'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { pagePaths } from '../../config/page-paths'
import { SentencesTranslationKeys } from '../../localization'

type Props = {
	headline?: string
	supportingText?: string
	displayBackButton?: boolean
} & React.PropsWithChildren

const AuthLayout: React.FunctionComponent<Props> = ({
	headline,
	supportingText,
	displayBackButton,
	children,
}) => {
	const router = useRouter()

	return (
		<Grid
			container
			sx={{
				backgroundColor: t => t.palette.secondary_shades[200],
				height: '100vh',
			}}
		>
			<Grid
				item
				xs={12}
				sm={6}
				height='100%'
				sx={{
					backgroundColor: t => t.palette.secondary.main,
				}}
			>
				<Stack
					justifyContent='center'
					padding='16px 48px'
					height='calc(100% - 32px)'
					gap='16px'
				>
					<Stack flex={1} justifyContent='flex-end'>
						{/* <Image
              src="logo_full.svg"
              alt="FieldBee"
              width={200}
              height={63}
              style={{
                aspectRatio: "16/9",
                marginBottom: "auto",
              }}
            /> */}
						<Typography
							variant='h5'
							marginTop={16}
							sx={{ color: theme.palette.white[900] }}
							// maxWidth="16ch"
							lineHeight='32px'
						>
							{headline}
						</Typography>
						{!!supportingText && (
							<Stack marginTop={0}>
								<Typography
									variant='body2'
									sx={{ color: theme.palette.white[700] }}
								>
									{supportingText ??
										t(
											SentencesTranslationKeys.ASimpleAndAffordableTractorGpsNavigationAndAutoSteeringSystemForYourFarm
										).toString()}
								</Typography>
							</Stack>
						)}
					</Stack>

					<Stack
						flex={1}
						alignSelf='flex-start'
						justifyContent='flex-end'
						padding='8px'
					>
						{!!displayBackButton && (
							<Link
								component='button'
								variant='body2'
								onClick={() => router.push(pagePaths.publicPages.login)}
								borderRadius='100px !important'
								border='1px solid #fff !important'
								padding='12px !important'
								lineHeight='normal'
							>
								<BackArrowIcon />
							</Link>
						)}
					</Stack>
				</Stack>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Stack
					justifyContent='center'
					alignItems='center'
					height='calc(100% - 32px)'
					padding='16px 24px'
					position='relative'
				>
					{/* <Box position={'absolute'} right={24} top={16} minWidth={166}>
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
									},
								}}
							>
								<MenuItem value='English'>
									<EnglishFlag />
									English
								</MenuItem>
							</Select>
						</FormControl>
					</Box> */}
					{children}
				</Stack>
			</Grid>
		</Grid>
	)
}

export default AuthLayout
