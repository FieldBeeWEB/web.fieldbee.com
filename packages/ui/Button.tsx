import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { styled } from '@mui/material'

const StyledButton = styled(LoadingButton)(({ theme }) => ({
	borderRadius: '100px',
	//  fontVariant: "all-small-caps",
	textTransform: 'none',
	fontSize: '14px',
	height: '40px',
	fontWeight: 500,
	lineHeight: '20px',
}))

type Props = {
	type?: 'primary' | 'secondary' | 'google'
	color?: string
} & LoadingButtonProps

export const Button = (props: LoadingButtonProps) => {
	return (
		<StyledButton
			color={!props.color ? 'primary' : props.color}
			variant='contained'
			{...props}
		/>
	)
}
