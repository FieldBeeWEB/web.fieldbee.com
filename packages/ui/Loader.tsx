import styled from '@emotion/styled'
import { theme } from './ThemeProvider'

interface LoaderProps {
	size?: number
	margin?: string
	borderWidth?: number
}

const StyledLoader = styled.div<LoaderProps>`
	border: ${props => (props.borderWidth ? `${props.borderWidth}px` : '10px')}
		solid ${theme.palette.primary.main};
	border-top: ${props =>
			props.borderWidth ? `${props.borderWidth}px` : '10px'}
		solid transparent;
	border-radius: 50%;
	width: ${props => (props.size ? `${props.size}px` : '60px')};
	height: ${props => (props.size ? `${props.size}px` : '60px')};
	animation: spin 2s linear infinite;
	margin: ${props => (props.margin ? `${props.margin}` : '')};
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export const Loader = ({
	size = 60,
	margin = '',
	borderWidth = 10,
}: LoaderProps) => (
	<StyledLoader size={size} margin={margin} borderWidth={borderWidth} />
)
