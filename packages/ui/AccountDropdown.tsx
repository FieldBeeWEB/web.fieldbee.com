import {
	AccountCircleOutlined,
	LogoutOutlined,
	OpenInNewOutlined,
	StoreOutlined,
} from '@mui/icons-material'

import { Avatar, Divider, Typography } from '@mui/material'
import { theme } from './ThemeProvider'
import BookOutlinedIcon from './custom-icons/BookOutlinedIcon'
import SettingsOutlinedIcon from './custom-icons/SettingsOutlinedIcon'
import { Dropdown, DropdownMenuItem } from './dropdown/Dropdown'

type Props = {
	firstName: string
}

const AccountDropdown = ({ firstName }: Props) => {
	const menuItems = [
		<DropdownMenuItem selected={false}>
			<AccountCircleOutlined />
			<Typography variant='body1'>My account</Typography>
		</DropdownMenuItem>,
		<DropdownMenuItem>
			<SettingsOutlinedIcon />
			<Typography variant='body1'>Settings</Typography>
		</DropdownMenuItem>,
		<Divider />,
		<DropdownMenuItem>
			<BookOutlinedIcon />
			<Typography variant='body1'>Knowledge base</Typography>
			<OpenInNewOutlined
				sx={{
					color: theme.palette.surface_emphasis.medium,
					marginLeft: 'auto',
				}}
			/>
		</DropdownMenuItem>,
		<Divider />,
		<DropdownMenuItem>
			<StoreOutlined />
			<Typography variant='body1'>Web shop</Typography>
			<OpenInNewOutlined
				sx={{
					color: theme.palette.surface_emphasis.medium,
					marginLeft: 'auto',
				}}
			/>
		</DropdownMenuItem>,
		<Divider />,
		<DropdownMenuItem>
			<LogoutOutlined />
			<Typography variant='body1'>Log out</Typography>
		</DropdownMenuItem>,
	]

	return (
		<Dropdown
			trigger={
				<Avatar
					sx={{
						bgcolor: theme.palette.primary.main,
						color: theme.palette.primary_emphasis.high,
					}}
				>
					{firstName[0]}
				</Avatar>
			}
			menu={[...menuItems]}
		/>
	)
}

export default AccountDropdown
