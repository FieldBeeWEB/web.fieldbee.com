import { Menu, MenuProps, Stack } from '@mui/material'
import { theme } from './ThemeProvider'

export const MapMenu = ({ children, ...props }: MenuProps) => {
	return (
		<Menu
			PaperProps={{
				elevation: 10,
				style: {
					height: '48px',
					transform: 'translateX(155px) translateY(0)',
				},
				sx: {
					overflow: 'visible',
					border: `1px solid ${theme.palette.secondary_shades[400]}`,
					borderRadius: '8px',
					ml: 1.5,
					fontSize: '12px',
					px: '5px',
					// '& .MuiSvgIcon-root': {
					// 	fill: theme.palette.secondary_shades[500],
					// 	width: '16px',
					// 	height: '16px',
					// 	minWidth: '24px',
					// },
					// '& .MuiDivider-root': {
					// 	borderColor: theme.palette.secondary_shades[400],
					// 	margin: '0 !important',
					// },
					// '& .MuiButtonBase-root': {
					// 	fontSize: '12px',
					// },
					// '& .MuiMenuItem-root': {
					// 	padding: '16px',
					// },
					'& .MuiList-root': {
						padding: 0,
						height: '100%',
						display: 'flex',
						alignItems: 'center',
					},
				},
			}}
			transformOrigin={{ horizontal: 'right', vertical: 'center' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
			{...props}
		>
			<Stack direction='row' spacing={1}>
				{children}
			</Stack>
		</Menu>
	)
}
