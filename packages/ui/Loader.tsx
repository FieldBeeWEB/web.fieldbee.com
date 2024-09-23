import styled from '@emotion/styled'

const StyledLoader = styled.div`
	border: 8px solid rgba(255, 216, 51, 0.5);
	border-top: 8px solid #ffd833;
	border-radius: 50%;
	width: 60px;
	height: 60px;
	animation: spin 2s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export const Loader = () => <StyledLoader />
