'use client'

import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import DutchFlag from './flags/DutchFlag'
import EnglishFlag from './flags/EnglishFlag'
import GermanFlag from './flags/GermanFlag'
import PolishFlag from './flags/PolishFlag'
import UkrainianFlag from './flags/UkrainianFlag'
import { theme } from './ThemeProvider'

const MENU_ITEMS = [
	{ lang: 'English', icon: <EnglishFlag /> },
	{ lang: 'Dutch', icon: <DutchFlag /> },
	{ lang: 'German', icon: <GermanFlag /> },
	{ lang: 'Polish', icon: <PolishFlag /> },
	{ lang: 'Ukrainian', icon: <UkrainianFlag /> },
]

const LanguageDropdown = () => {
	return (
		<FormControl
			sx={{
				width: '137px',
				backgroundColor: theme.palette.elevation_overlay['08dp'],
			}}
		>
			<Select
				value='English'
				MenuProps={{
					PaperProps: {
						sx: theme => ({
							marginTop: '4px',
							marginLeft: '4px',
							'& .MuiList-root': {
								borderRadius: '4px',
								width: '240px',
								maxHeight: '352px',
								boxShadow: '0px 8px 10px 0px #00000024',
								background: theme.palette.elevation_overlay['08dp'],
							},
							'& .Mui-selected': {
								backgroundColor: `${theme.palette.surface_states.selected} !important`,
							},
							'& .MuiMenuItem-root': {
								padding: '16px 12px',
								'&:hover': {
									backgroundColor: theme.palette.surface_states.hover,
								},
							},
						}),
					},
				}}
				sx={{
					'& .MuiTypography-root': {
						textTransform: 'uppercase',
						fontSize: '14px',
						fontWeight: 500,
					},
					'& .MuiSelect-select': {
						padding: '9px 12px !important',
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						'& svg': {
							width: '18px',
							height: '18px',
						},
						border: 'none',
					},
				}}
			>
				{MENU_ITEMS.map(({ lang, icon }) => (
					<MenuItem
						key={lang}
						value={lang}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1.5,
						}}
					>
						{icon}
						<Typography variant='body1'>{lang}</Typography>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default LanguageDropdown
