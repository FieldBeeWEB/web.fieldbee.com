import { Container, Tab, Tabs } from '@fieldbee/ui/components'
import TabPanel from '@fieldbee/ui/TabPanel'
import { t } from 'i18next'
import React from 'react'
import { SingleWordsTranslationKeys } from '../../localization'
import AccountPanel from '../../screens/profile/account/account-panel'
import UserSettings from '../../screens/settings/user-settings'

const Account = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Container>
			<Tabs
				orientation='horizontal'
				variant='scrollable'
				value={value}
				onChange={handleChange}
				aria-label={t(SingleWordsTranslationKeys.Settings).toString()}
			>
				<Tab label={t(SingleWordsTranslationKeys.Account)} />
				<Tab label={t(SingleWordsTranslationKeys.Settings)} />
			</Tabs>
			<TabPanel value={value} index={0} fixedHeight={true}>
				<AccountPanel />
			</TabPanel>
			<TabPanel value={value} index={1} fixedHeight={true}>
				<UserSettings />
			</TabPanel>
		</Container>
	)
}

export default Account
