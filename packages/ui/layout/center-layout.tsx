import {
	ContainerProps,
	Box as MBox,
	Container as MContainer,
	styled,
} from '@mui/material'

const Wrapper = styled(MBox)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	width: '100vw',
	minHeight: '100vh',
}))

const Container = styled(MContainer)(({ theme }) => ({
	paddingTop: '30px',
	paddingBottom: '30px',
}))

export const CenterLayout = (props: ContainerProps) => {
	return (
		<Wrapper>
			<Container maxWidth='sm'>{props.children}</Container>
		</Wrapper>
	)
}
