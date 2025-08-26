import { SvgIcon } from '@mui/material'

const UkrainianFlag = () => {
	return (
		<SvgIcon
			viewBox='0 0 24 24'
			style={{
				borderRadius: '100%',
			}}
		>
			<rect width='24' height='24' rx='12' fill='#FFDA2C' />
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M0 0H24V12.8H0V0Z'
				fill='#3A99FF'
			/>
		</SvgIcon>
	)
}

export default UkrainianFlag
