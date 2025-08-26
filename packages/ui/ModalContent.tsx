import { Box as MBox, Modal, ModalProps, styled } from '@mui/material'
import { ModalHead } from './ModalHead'

const SMALL_MODAL_WIDTH = 300
const NORMAL_MODAL_WIDTH = 560
const LARGE_MODAL_WIDTH = 780

const SMALL_MODAL_HEIGHT = 300
const NORMAL_MODAL_HEIGHT = 400
const LARGE_MODAL_HEIGHT = 680

const Box = styled(MBox, {
	shouldForwardProp: prop => prop !== 'modalHeight' && prop !== 'modalWidth',
})<RootProps>(({ theme, modalHeight, modalWidth }) => ({
	backgroundColor: theme.palette.secondary.main,
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	color: theme.palette.surface_emphasis.medium,
	padding: 0,
	borderRadius: 16,
	display: 'flex',
	flexDirection: 'column',
	[theme.breakpoints.down('md')]: {
		height: modalHeight === 'dialog' ? 'unset' : '85vh',
		width: modalWidth === 'dialog' ? `${SMALL_MODAL_WIDTH}px` : '90vw',
	},
	[theme.breakpoints.up('md')]: {
		height: `${
			modalHeight === 'large'
				? LARGE_MODAL_HEIGHT
				: modalHeight === 'normal'
					? NORMAL_MODAL_HEIGHT
					: modalHeight === 'dialog'
						? 'unset'
						: SMALL_MODAL_HEIGHT
		}px`,
		width: `${
			modalWidth === 'large'
				? LARGE_MODAL_WIDTH
				: modalWidth === 'normal'
					? NORMAL_MODAL_WIDTH
					: SMALL_MODAL_WIDTH
		}px`,
	},
}))

const StyledModal = styled(Modal)(({ theme }) => ({
	backgroundColor: 'rgba(0, 0, 0, 0.80)',
}))

type ModalHeight = 'small' | 'normal' | 'large' | 'dialog'
type ModalWidth = 'small' | 'normal' | 'large' | 'dialog'

interface RootProps {
	modalHeight?: ModalHeight
	modalWidth?: ModalWidth
	hasBottomBorder?: boolean
	isDialog?: boolean
}
type Props = { modalTitle?: string; handleClose: () => void } & RootProps &
	ModalProps

export const ModalContent = ({
	children,
	modalHeight = 'small',
	modalWidth = 'small',
	isDialog = false,
	hasBottomBorder,
	modalTitle,
	handleClose,
	...props
}: Props) => {
	return (
		<StyledModal onClose={handleClose} {...props}>
			<Box
				modalHeight={isDialog ? 'dialog' : modalHeight}
				modalWidth={isDialog ? 'dialog' : modalWidth}
			>
				<ModalHead
					hasBottomBorder={hasBottomBorder}
					title={modalTitle}
					closeModal={handleClose}
				/>
				{children}
			</Box>
		</StyledModal>
	)
}
