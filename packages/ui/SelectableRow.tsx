import { Stack, StackProps } from '@mui/material'

type Props = {
	selected: boolean
} & StackProps

export const SelectableRow = ({ selected, ...props }: Props) => {
	return (
		<Stack
			height='48px'
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			sx={theme => ({
				borderBottom: selected
					? `1px solid ${theme.palette.primary.main}`
					: `1px solid ${theme.palette.additional.pink}`,
				backgroundColor: selected
					? `${theme.palette.additional.pink}`
					: `${theme.palette.additional.pink}`,
				cursor: 'pointer',
				'&:hover': {
					borderBottom: `1px solid ${theme.palette.primary.main}`,
					background: `${theme.palette.additional.pink}`,
				},
			})}
			{...props}
		>
			{props.children}
		</Stack>
	)
}
