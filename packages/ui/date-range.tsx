import { Stack, SvgIcon, Typography } from '@mui/material'
import { theme } from './ThemeProvider'

interface Props {
	startDate: string
	endDate: string
}

const DateRange = ({ startDate, endDate }: Props) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)

		if (isNaN(date.getTime())) {
			return { day: '', month: '', year: '' }
		}

		const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(
			date
		)
		const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(
			date
		)
		const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric' }).format(
			date
		)

		return { day, month, year }
	}

	const start = formatDate(startDate)
	const end = formatDate(endDate)

	return (
		<Stack direction={'row'} alignItems='center' spacing={0} paddingY={1}>
			<SvgIcon
				viewBox='0 0 100 104'
				sx={{
					width: 50,
					height: 50,
					flexShrink: 0,
				}}
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M88.8889 11.3462H83.3333V0.192383H72.2222V11.3462H27.7778V0.192383H16.6667V11.3462H11.1111C4.94445 11.3462 0 16.3655 0 22.5001V92.3853C0 98.5 4.94444 103.519 11.1111 103.539H88.8889C95 103.539 100 98.5199 100 92.3853V22.5001C100 16.3655 95 11.3462 88.8889 11.3462ZM95 90.5001C95 94.9184 91.4183 98.5001 87 98.5001H50H13C8.58172 98.5001 5 94.9184 5 90.5001V74.5001V56.5007H50H95V74.5001V90.5001Z'
					fill='#6BBDFF'
				/>
				<text
					x='50%'
					y='35%'
					dominantBaseline={'middle'}
					textAnchor='middle'
					fontSize={28}
					fontWeight={800}
					fill={theme.palette.background.default}
				>
					{start.year}
				</text>
				<text
					x='50%'
					y='75%'
					dominantBaseline={'middle'}
					textAnchor='middle'
					fontSize={24}
					fill={theme.palette.surface_emphasis.high}
				>
					{start.day} {start.month}
				</text>
			</SvgIcon>

			{end.year && (
				<>
					<Typography variant='h6' sx={{ margin: '0 8px' }}>
						-
					</Typography>
					<SvgIcon
						viewBox='0 0 100 104'
						sx={{
							width: 50,
							height: 50,
							flexShrink: 0,
						}}
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M88.8889 11.3462H83.3333V0.192383H72.2222V11.3462H27.7778V0.192383H16.6667V11.3462H11.1111C4.94445 11.3462 0 16.3655 0 22.5001V92.3853C0 98.5 4.94444 103.519 11.1111 103.539H88.8889C95 103.539 100 98.5199 100 92.3853V22.5001C100 16.3655 95 11.3462 88.8889 11.3462ZM95 90.5001C95 94.9184 91.4183 98.5001 87 98.5001H50H13C8.58172 98.5001 5 94.9184 5 90.5001V74.5001V56.5007H50H95V74.5001V90.5001Z'
							fill='#A1C45A'
						/>
						<text
							x='50%'
							y='35%'
							dominantBaseline={'middle'}
							textAnchor='middle'
							fontSize={28}
							fontWeight={800}
							fill={theme.palette.background.default}
						>
							{end.year}
						</text>
						<text
							x='50%'
							y='75%'
							dominantBaseline={'middle'}
							textAnchor='middle'
							fontSize={24}
							fill={theme.palette.surface_emphasis.high}
						>
							{end.day} {end.month}
						</text>
					</SvgIcon>
				</>
			)}
		</Stack>
	)
}

export default DateRange
