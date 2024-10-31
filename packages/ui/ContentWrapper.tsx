import { BoxProps, Box as MBox, styled } from '@mui/material'

const Wrapper = styled(MBox)(({ theme }) => ({
	backgroundColor: theme.palette.secondary_shades[200],
	minHeight: 'calc(100vh - 65px)',
	// width: "calc(100vw - 81px)",
	// position: "absolute",
	// left: "81px",
	color: theme.palette.common.white,
}))

export const ContentWrapper = (props: BoxProps) => {
	return <Wrapper {...props} />
}
