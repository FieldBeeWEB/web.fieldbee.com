import { Stack, StackProps } from '@mui/material'

type Props = {
	active?: boolean
} & StackProps

export const MapButtons = ({ active, ...props }: Props) => {
	return (
		<Stack
			style={{
				position: 'absolute',
				top: '24px',
				right: '24px',
				zIndex: 10,
			}}
			spacing={2}
			direction='column-reverse'
			alignItems='center'
			justifyContent='center'
			{...props}
		>
			{props.children}
		</Stack>
	)
}
