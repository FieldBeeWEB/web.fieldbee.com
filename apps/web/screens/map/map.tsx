import { useGetOrganizationFields } from '@fieldbee/api'
import {
	ExpandBadge,
	InputWithIcon,
	MapButton,
	MapButtons,
	Stack,
	theme,
} from '@fieldbee/ui'
import { Box, Collapse, Typography } from '@fieldbee/ui/components'
import MeasurementIcon from '@fieldbee/ui/custom-icons/MeasurementIcon'
import { MyLocationOutlined, Search } from '@fieldbee/ui/icons'
import { t } from 'i18next'
import * as React from 'react'
import {
	PhrasesTranslationKeys,
	SingleWordsTranslationKeys,
} from '../../localization'
import AuthedLayout from '../authed-layout'
import WidgetEmptyData from '../dashboard/dashboard-widgets/widget-empty-data'
import FiltersModal from '../fields-new/filters-modal/filters-modal'
import FieldsLayer from './fields-layer/fields-layers'
import FieldsPanel from './fields-panel/fields-panel'
import MapContent from './map-content'
import MapProvider from './utils/map-provider'
import AddFieldWidget from './widgets/add-field-widget'
import LayerSelectorWidget from './widgets/layer-selector-widget'

export default function Map() {
	const [searchTerm, setSearchTerm] = React.useState<string>('')
	const { data: organizationFieldsData } = useGetOrganizationFields()

	const [measurementActive, setMeasurementActive] =
		React.useState<boolean>(false)

	const handleMeasurement = React.useCallback(() => {
		setMeasurementActive(p => !p)
	}, [])

	const [expanded, setExpanded] = React.useState<boolean>(false)
	const handleExpanded = React.useCallback(() => {
		setExpanded(p => !p)
	}, [])

	return (
		<AuthedLayout>
			<MapProvider>
				<Stack spacing={0} height='calc(100vh - 65px)' position='relative'>
					<Stack
						display='flex'
						direction='column'
						position='absolute'
						width='400px'
						bgcolor={theme.palette.elevation_overlay['01dp']}
						zIndex={10}
						spacing={0}
					>
						<Stack
							display='flex'
							direction='row'
							alignItems='center'
							justifyContent='space-between'
							spacing={0}
							padding={2}
							paddingBottom={0}
						>
							<Typography
								variant='h6'
								color={theme.palette.surface_emphasis.high}
							>
								{t(SingleWordsTranslationKeys.Fields).toString()}
							</Typography>
							<AddFieldWidget />
						</Stack>
						<Collapse in={expanded} orientation='vertical'>
							<Stack
								direction='column'
								height='calc(100vh - 65px - 92px)'
								spacing={0}
							>
								{organizationFieldsData ? (
									<>
										<Stack
											direction='row'
											alignItems='center'
											spacing={0.5}
											padding={2}
										>
											<InputWithIcon
												fullWidth={true}
												placeholder='Search'
												startAdornment={
													<Search
														sx={{ width: '32px', height: '32px' }}
														fill={theme.palette.surface_emphasis.medium}
													/>
												}
												value={searchTerm}
												onChange={e => setSearchTerm(e.target.value)}
											/>

											<Box
												sx={{
													marginX: '12px',
												}}
											>
												<FiltersModal />
											</Box>
										</Stack>
										<FieldsPanel searchTerm={searchTerm} />
									</>
								) : (
									<Stack marginY='auto'>
										<WidgetEmptyData
											title={''}
											errorMsg={t(
												PhrasesTranslationKeys.NoFieldsYet
											).toString()}
										/>
									</Stack>
								)}
							</Stack>
						</Collapse>

						<ExpandBadge onClick={() => handleExpanded()} expanded={expanded} />
					</Stack>

					<MapButtons>
						<MapButton active={measurementActive} onClick={handleMeasurement}>
							<MeasurementIcon />
						</MapButton>
						<LayerSelectorWidget />
					</MapButtons>

					<MapButton
						position='absolute'
						right='24px'
						bottom='137px'
						zIndex='10'
						onClick={() => console.log('Click')}
					>
						<MyLocationOutlined />
					</MapButton>

					<MapContent measurementActive={measurementActive}>
						{organizationFieldsData && (
							<FieldsLayer
								fieldUris={organizationFieldsData.map(x => x.uri)}
								measurementActive={measurementActive}
							/>
						)}
					</MapContent>
				</Stack>
			</MapProvider>
		</AuthedLayout>
	)
}
