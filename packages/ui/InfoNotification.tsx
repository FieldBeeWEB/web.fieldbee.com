import { BoxProps, Box as MBox, styled } from '@mui/material'

const Badge = styled(MBox)(({ theme }) => ({
	borderRadius: '24px',
	border: `1px solid ${theme.palette.background.default}`,
	background: `${theme.palette.background.default}`,
	display: 'flex',
	padding: '12px 32px',
	justifyContent: 'center',
	alignItems: 'center',
	color: `${theme.palette.background.default}`,
	fontSize: '12px',
}))

export const InfoNotification = (props: BoxProps) => {
	return <Badge {...props} />
}
