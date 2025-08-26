import { ThemeProvider as MThemeProvider } from '@mui/material'
import {
	createTheme,
	PaletteColorOptions,
	Theme,
	ThemeOptions,
} from '@mui/material/styles'
import React from 'react'

declare module '@mui/material/styles' {
	interface Palette extends PaletteOptions {}

	interface PaletteOptions {
		primary_shades: PaletteColorOptions
		primary_emphasis: {
			high: string
			medium: string
			disabled: string
		}
		primary_states: {
			hover: string
			focused: string
			pressed: string
			dragged: string
			selected: string
		}
		surface_emphasis: {
			high: string
			medium: string
			disabled: string
		}
		surface_states: {
			hover: string
			focused: string
			pressed: string
			dragged: string
			selected: string
		}
		elevation_overlay: {
			'01dp': string
			'02dp': string
			'03dp': string
			'04dp': string
			'06dp': string
			'08dp': string
			'12dp': string
			'16dp': string
			'24dp': string
		}
		additional: {
			brown: string
			red: string
			orange: string
			honey: string
			yellow: string
			khaki: string
			green: string
			laguna: string
			blue: string
			purple: string
			pink: string
			gray: string
		}
		surface: {
			main: string
		}
		outline: {
			main: string
		}
	}
}

export const theme: Theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#FFC34B',
		},
		primary_shades: {
			900: '#6E4600',
			800: '#8F5D00',
			700: '#B37400',
			600: '#CC8500',
			500: '#E19500',
			400: '#F5A10D',
			300: '#FFB627',
			200: '#FFC34B',
			100: '#FFD38A',
			50: '#FFEBCD',
		},
		primary_emphasis: {
			high: '#1C1C1C',
			medium: '#1C1C1CBD',
			disabled: '#1C1C1C61',
		},
		primary_states: {
			hover: '#FFC34B0A',
			focused: '#FFC34B1F',
			pressed: '#FFC34B1F',
			dragged: '#FFC34B1F',
			selected: '#FFC34B14',
		},
		error: {
			main: '#FF6F5E',
		},
		background: {
			default: '#121212',
		},
		surface: {
			main: '#1B1B1B',
		},
		surface_emphasis: {
			high: '#FFFFFFDE',
			medium: '#FFFFFF99',
			disabled: '#FFFFFF61',
		},
		surface_overlay: {
			main: '#FFFFFF1F',
		},
		surface_states: {
			hover: '#FFFFFF0A',
			focused: '#FFFFFF1F',
			pressed: '#FFFFFF1A',
			dragged: '#FFFFFF1F',
			selected: '#FFFFFF14',
		},
		outline: {
			main: '#FFFFFF3D',
		},
		elevation_overlay: {
			'01dp': '#262626',
			'02dp': '#2B2B2B',
			'03dp': '#2D2D2D',
			'04dp': '#303030',
			'06dp': '#343434',
			'08dp': '#363636',
			'12dp': '#3B3B3B',
			'16dp': '#3D3D3D',
			'24dp': '#3F3F3F',
		},
		additional: {
			brown: '#8C6347',
			red: '#EC5C4F',
			orange: '#FF771C',
			honey: '#FFB640',
			yellow: '#FFDB45',
			khaki: 'C9C569',
			green: '#A1C45A',
			laguna: '#69C9A1',
			blue: '#6BBDFF',
			purple: '#7D8CF6',
			pink: '#F28CFF',
			gray: '#B6B8BD',
		},
	},
} as ThemeOptions)

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
	return <MThemeProvider theme={theme}>{children}</MThemeProvider>
}
