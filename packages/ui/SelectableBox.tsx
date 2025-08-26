import { Box, BoxProps } from '@mui/material'

type Props = {
	selected: boolean
} & BoxProps

export const SelectableBox = ({ selected, ...props }: Props) => (
	<Box
		padding={1}
		sx={theme => ({
			cursor: 'pointer',
			borderRadius: '4px',
			border: selected
				? `1px solid ${theme.palette.primary.main}`
				: `1px solid transparent`,
			backgroundColor: selected
				? theme.palette.primary_states.selected
				: theme.palette.elevation_overlay['03dp'],
			'&:hover': {
				backgroundColor: selected
					? theme.palette.primary_states.hover
					: theme.palette.surface_states.hover,
				border: selected
					? `1px solid ${theme.palette.primary.main}`
					: `1px solid ${theme.palette.outline.main}`,
			},
		})}
		{...props}
	>
		{props.children}
	</Box>
)
