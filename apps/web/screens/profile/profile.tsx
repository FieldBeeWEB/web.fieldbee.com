import { Box, Tab, Tabs } from '@fieldbee/ui/components'
import TabPanel from '@fieldbee/ui/TabPanel'
import { t } from 'i18next'
import * as React from 'react'
import { SingleWordsTranslationKeys } from '../../localization'
import AuthedLayout from '../authed-layout'
import AccountPanel from './account/account-panel'

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

export default function AccountPage() {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<AuthedLayout>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label='profile-tabs'>
						<Tab
							label={t(SingleWordsTranslationKeys.Account).toString()}
							{...a11yProps(0)}
						/>
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<AccountPanel />
				</TabPanel>
			</Box>
		</AuthedLayout>
	)
}
