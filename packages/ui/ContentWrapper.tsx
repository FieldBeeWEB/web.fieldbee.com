import { BoxProps, Box as MBox, styled } from '@mui/material'

const Wrapper = styled(MBox)(({ theme }) => ({
	minHeight: 'calc(100vh - 65px)',
}))

export const ContentWrapper = (props: BoxProps) => {
	return <Wrapper {...props} />
}
