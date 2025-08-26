import { BoxProps, Box as MBox, styled } from '@mui/material'

const Box = styled(MBox)(({ theme }) => ({
	borderTop: `1px solid ${theme.palette.additional.pink}`,
	padding: 8,
	display: 'flex',
	justifyContent: 'end',
	zIndex: 100,
	backgroundColor: theme.palette.secondary.main,
	borderBottomRightRadius: 16,
	borderBottomLeftRadius: 16,
}))

export const ModalFooter = (props: BoxProps) => {
	return (
		<Box
			// style={{
			//   position: "sticky",
			//   bottom: 0,
			//   left: 0,
			// }}
			{...props}
		/>
	)
}
