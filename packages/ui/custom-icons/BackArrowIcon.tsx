import { SvgIcon, SxProps } from '@mui/material'

interface IBackArrowIcon {
	width?: string
	height?: string
	sx?: SxProps
}

const BackArrowIcon = ({ width, height, sx }: IBackArrowIcon) => {
	return (
		<SvgIcon
			viewBox='0 0 16 16'
			width={width || '16px'}
			height={height || '16px'}
			sx={sx}
		>
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					id='Vector'
					d='M8 16L0 8L8 0L9.05 1.05L2.85 7.25H16V8.75H2.85L9.05 14.95L8 16Z'
					fill='white'
				/>
			</svg>
		</SvgIcon>
	)
}

export default BackArrowIcon
