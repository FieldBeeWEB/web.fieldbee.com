import { ChevronLeft } from '@mui/icons-material'
import { Stack, StackProps } from '@mui/material'

type Props = {
	expanded: boolean
} & StackProps

export const ExpandBadge = ({ expanded, ...props }: Props) => (
	<Stack
		sx={theme => ({
			height: '36px',
			width: '100%',
			cursor: 'pointer',
			// background: theme.palette.elevation_overlay['01dp'],
			zIndex: 10,
			fontSize: '14px',
		})}
		spacing='8'
		direction='row'
		alignItems='center'
		justifyContent='center'
		{...props}
	>
		<ChevronLeft
			sx={{
				transform: expanded ? 'rotate(90deg)' : 'rotate(-90deg)',
			}}
		/>
	</Stack>
)
