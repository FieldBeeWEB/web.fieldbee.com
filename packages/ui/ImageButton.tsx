import { Stack, StackProps } from '@mui/material'

type Props = {
	active?: boolean
	src: string
	alt: string
} & StackProps

export const ImageButton = ({ active, src, alt, ...props }: Props) => {
	return (
		<Stack
			sx={theme => ({
				height: '80px',
				width: '80px',
				cursor: 'pointer',
				background: theme.palette.background.default,
				borderRadius: '4px',
				backgroundColor: 'transparent',
				border: active
					? `3px solid ${theme.palette.primary.main}`
					: '3px solid transparent',
			})}
			spacing='8'
			direction='row'
			alignItems='center'
			justifyContent='center'
			{...props}
		>
			<img
				style={{
					borderRadius: '4px',
					width: active ? '70px' : '80px',
					height: active ? '70px' : '80px',
				}}
				src={src}
				alt={alt}
			/>
		</Stack>
	)
}
