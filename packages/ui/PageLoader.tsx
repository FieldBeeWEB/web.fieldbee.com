'use client'

import styled from '@emotion/styled'
import { theme } from './ThemeProvider'
import LogoFull from './custom-icons/LogoFull'
import LogoShort from './custom-icons/LogoShort'

const Loader = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100svw;
	height: 100svh;
	z-index: 9999;
	overflow: hidden;
	background-color: ${theme.palette.surface.main};
`

const LoaderContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`

const LoaderIcon = styled.div`
	position: absolute;
	inset: 0;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		transform-origin: center;
		animation: rotate 1.5s ease-in-out;
		transform: translate(150%, 0%) rotate(0deg);
		opacity: 0;
		position: absolute;
		height: 20svh;
		width: 24svh;
		animation-delay: 1.75s;
	}
	@keyframes rotate {
		0% {
			transform: translate(150%, 0%) rotate(0deg);
			opacity: 0;
		}
		20% {
			transform: translate(150%, 0%) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translate(-210%, 0%) rotate(360deg);
			opacity: 0;
		}
	}
`

const LoaderIconTitle = styled.div`
	position: absolute;
	inset: 0;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		height: 20svh;
		opacity: 0;
		width: 100%;
		animation: opacity 1.5s ease-in-out forwards;
		animation-delay: 1.75s;
	}
	@keyframes opacity {
		0%,
		70% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`

const LoaderTiles = styled.div`
	display: flex;
	flex-direction: column;

	div {
		width: 0%;
		height: 25svh;
		background-color: ${theme.palette.background.default};
		animation: slide-in 1s ease-in-out forwards;
	}

	div:nth-child(2) {
		animation-delay: 0.25s;
	}
	div:nth-child(3) {
		animation-delay: 0.5s;
	}
	div:nth-child(4) {
		animation-delay: 0.75s;
	}

	@keyframes slide-in {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}
`

export const PageLoader = () => {
	return (
		<Loader>
			<LoaderContainer>
				{/* <DotLottieReact
				src='https://lottie.host/dc791290-765a-471d-a831-4b107cdbe264/KgLEtJlr72.lottie'
				loop
				autoplay
				width={'50%'}
				height={'50%'}
			/> */}
				<LoaderTiles>
					<div />
					<div />
					<div />
					<div />
				</LoaderTiles>
				<LoaderIcon>
					<LogoShort />
				</LoaderIcon>
				<LoaderIconTitle>
					<LogoFull />
				</LoaderIconTitle>
			</LoaderContainer>
		</Loader>
	)
}
