import { SvgIcon, SvgIconProps } from '@mui/material'
import React from 'react'

const MeasurementIcon: React.FunctionComponent<SvgIconProps> = props => (
	<SvgIcon width='24' height='24' viewBox='0 0 24 24' {...props}>
		<g clipPath='url(#clip0_303_6519)'>
			<path
				d='M15.8578 0.216797L23.6698 8.0278L7.86078 23.8358L0.0507812 16.0238L15.8578 0.216797ZM15.8578 3.0448L13.6738 5.2288L15.2758 6.8318L13.8618 8.2458L12.2598 6.6438L10.0758 8.8278L12.4778 11.2298L11.0628 12.6438L8.66178 10.2418L6.47778 12.4258L8.07978 14.0278L6.66578 15.4428L5.06278 13.8398L2.87878 16.0238L7.86178 21.0068L20.8418 8.0278L15.8578 3.0448Z'
				fill='white'
				fillOpacity='0.87'
			/>
		</g>
		<defs>
			<clipPath id='clip0_303_6519'>
				<rect width='24' height='24' fill='white' />
			</clipPath>
		</defs>
	</SvgIcon>
)

export default MeasurementIcon
