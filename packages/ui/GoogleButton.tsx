import styled from '@emotion/styled'
import * as React from 'react'
import { Typography } from './components'

const StyledButton = styled.button`
	width: 100%;
	display: flex;
	align-items: center;
	background: #ffffff;
	box-shadow:
		0px 0px 1px rgba(0, 0, 0, 0.084),
		0px 1px 1px rgba(0, 0, 0, 0.168);
	height: 40px;
	font-weight: 500;
	font-size: 14px;
	color: #757575;
	padding-left: 8px;
	padding-right: 8px;
	border: 1px solid #c8c1ce;
	border-radius: 4px;
	cursor: pointer;
`

const Image = styled.img`
	width: 18px;
	height: 18px;
	margin-left: 16px;
`

type Props = {
	imageSrc: string
} & React.PropsWithChildren

const GoogleButton: React.FunctionComponent<Props> = ({
	imageSrc,
	children,
}) => {
	return (
		<StyledButton>
			<Image src={imageSrc} alt='' />
			<Typography width='100%' padding='8px 16px' color='#757575'>
				{children}
			</Typography>
		</StyledButton>
	)
}

export default GoogleButton
