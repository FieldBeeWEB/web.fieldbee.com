import { BoxProps, Box as MBox, styled } from '@mui/material'

const Dot = styled(MBox)(({ theme }) => ({
	width: '4px',
	height: '4px',
	borderRadius: '100px',
	background: theme.palette.surface_emphasis.medium,
}))

export const DotDivider = (props: BoxProps) => {
	return <Dot {...props} />
}
