import { Close } from '@mui/icons-material'
import {
	BoxProps,
	IconButton,
	Box as MBox,
	styled,
	Typography,
} from '@mui/material'

const Box = styled(MBox, {
	shouldForwardProp: prop =>
		prop !== 'hasBottomBorder' && prop !== 'hasBottomBorder',
})<{ hasBottomBorder?: boolean }>(({ theme, hasBottomBorder }) => ({
	borderBottom: !!hasBottomBorder
		? `1px solid ${theme.palette.additional.pink}`
		: 'none',
	padding: '16px',
	display: 'flex',
	backgroundColor: theme.palette.secondary.main,
	borderTopLeftRadius: 16,
	borderTopRightRadius: 16,
	justifyContent: 'end',
	alignItems: 'center',
}))

type Props = {
	closeModal: () => void
	title?: string
	hasBottomBorder?: boolean
} & BoxProps

export const ModalHead = ({
	closeModal,
	title,
	hasBottomBorder = true,
	...props
}: Props) => {
	return (
		<Box hasBottomBorder={hasBottomBorder} {...props}>
			{title && (
				<Typography
					sx={{
						marginRight: 'auto',
						fontWeight: '700',
					}}
				>
					{title}
				</Typography>
			)}
			<IconButton size='small' aria-label='close' onClick={closeModal}>
				<Close />
			</IconButton>
		</Box>
	)
}
