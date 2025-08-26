import { Stack, StackProps } from '@mui/material'

export const RoundedListItem = (props: StackProps) => {
	return (
		<Stack
			sx={theme => ({
				borderRadius: '4px',
				border: `1px solid ${theme.palette.outline.main}`,
				background: theme.palette.background.default,
				padding: '12px 8px',
				alignItems: 'flex-start',
			})}
			direction='row'
			spacing={1}
			{...props}
		/>
	)
}
