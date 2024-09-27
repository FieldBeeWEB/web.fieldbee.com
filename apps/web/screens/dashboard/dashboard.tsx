import { Stack, theme } from '@fieldbee/ui'
import { Container, Typography } from '@fieldbee/ui/components'
import { t } from 'i18next'
import Image from 'next/image'
import { useState } from 'react'
import { PhrasesTranslationKeys } from '../../localization'
import AuthedLayout from '../authed-layout'
import DashboardContainer from './dashboard-container/dashboard-container'
import DashboardHeader from './dashboard-header'
import WidgetCropsOverview from './dashboard-widgets/widget-crops-overview'
import WidgetSummary from './dashboard-widgets/widget-summary'
import WidgetTasksDetails from './dashboard-widgets/widget-tasks-details'
import WidgetTasksProgress from './dashboard-widgets/widget-tasks-progress'
import WidgetWrapper from './dashboard-widgets/widget-wrapper'

const Dashboard = () => {
	const currentYear = new Date().getFullYear()
	const [selectedPeriod, setSelectedPeriod] = useState<string>(
		currentYear.toString()
	)

	return (
		<AuthedLayout>
			<Container>
				<Stack overflow={'auto'} paddingBottom={6}>
					<DashboardHeader
						handleSelectedPeriod={setSelectedPeriod}
						selectedPeriod={selectedPeriod}
					/>
					<DashboardContainer>
						<Stack spacing={1} direction={'row'}>
							<WidgetSummary
								title={32}
								subtitle={t(PhrasesTranslationKeys.FieldsAmount).toString()}
								width={'100%'}
							/>
							<WidgetSummary
								title={'4678,3 ha'}
								subtitle={t(PhrasesTranslationKeys.TotalArea).toString()}
								width={'100%'}
							/>
							<WidgetSummary
								title={246}
								subtitle={t(PhrasesTranslationKeys.TasksAmount).toString()}
								width={'100%'}
							/>
						</Stack>
						<Stack spacing={1} direction={'row'}>
							<Stack spacing={1} direction={'column'} width={'50%'}>
								<WidgetCropsOverview />
								<WidgetWrapper height={'100%'}>
									<Image
										src={'/advertise.gif'}
										alt='Placeholder gif'
										height={162}
										width={300}
										style={{
											margin: '0 auto',
										}}
									/>
									<Typography
										sx={{
											fontSize: '28px',
											lineHeight: '36px',
											fontWeight: 400,
											textAlign: 'center',
											color: theme.palette.white[900],
										}}
									>
										Advertise here
									</Typography>
								</WidgetWrapper>
							</Stack>
							<Stack spacing={1} direction={'column'} width={'50%'}>
								<WidgetTasksProgress />
								<WidgetTasksDetails />
							</Stack>
						</Stack>
						{/* <div>Selected period: {selectedPeriod}</div> */}
					</DashboardContainer>
				</Stack>
			</Container>
		</AuthedLayout>
	)
}

export default Dashboard
