import { SvgIcon, SvgIconProps } from '@mui/material'
import * as React from 'react'

const ArrowBackIcon: React.FunctionComponent<SvgIconProps> = props => (
	<SvgIcon viewBox='0 0 16 16' {...props}>
		<rect x='0.5' y='0.5' width='39' height='39' rx='19.5' stroke='white' />
		<path
			d='M20 28L12 20L20 12L21.05 13.05L14.85 19.25H28V20.75H14.85L21.05 26.95L20 28Z'
			fill='white'
		/>
	</SvgIcon>
)

export default ArrowBackIcon
