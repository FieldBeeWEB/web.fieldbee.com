import { Button, ButtonProps, styled } from '@mui/material'
import { theme } from './ThemeProvider'

const StyledButton = styled(Button)(({ theme }) => ({
	height: 48,
	width: 48,
	padding: 0,
	borderRadius: '8px',
	minWidth: 'unset',
	flexDirection: 'column',
	fontSize: '12px',
	color: theme.palette.background.default,
	fontWeight: 600,
	lineHeight: '16px',
	fontVariant: 'all-small-caps',
	'.MuiButton-startIcon': {
		margin: 0,
	},
	'&:active, &:hover': {
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.background.default,
	},
}))

type Props = {
	active?: boolean
} & ButtonProps

export const NavButton = ({ active, ...props }: Props) => {
	return (
		<StyledButton
			sx={{
				color: active ? theme.palette.primary.main : '',
				backgroundColor: active ? theme.palette.background.default : '',
			}}
			{...props}
		/>
	)
}
