import { useGetOrganizationFields } from '@fieldbee/api'
import { InputWithIcon, MapButton, MapButtons, Stack } from '@fieldbee/ui'
import CollapsibleLayout from '@fieldbee/ui/collapsible-layout/collapsible-layout'
import { Box } from '@fieldbee/ui/components'
import { Search, SquareFoot } from '@fieldbee/ui/icons'
import * as React from 'react'
import AuthedLayout from '../authed-layout'
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

	return (
		<AuthedLayout>
			<MapProvider>
				<CollapsibleLayout
					expandedLabel='Hide fields'
					narrowedLabel='Show fields'
					leftComponent={
						<>
							<Stack
								direction='row'
								alignItems='center'
								spacing={0.5}
								padding={1}
								sx={theme => ({
									borderBottom: `1px solid ${theme.palette.secondary_shades[400]}`,
									backgroundColor: theme.palette.secondary_shades[300],
								})}
							>
								<InputWithIcon
									fullWidth={true}
									placeholder='Search'
									startAdornment={<Search />}
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
					}
					rightComponent={
						<>
							<MapButtons>
								<MapButton
									active={measurementActive}
									onClick={() => handleMeasurement()}
								>
									<SquareFoot />
								</MapButton>
								<LayerSelectorWidget />
							</MapButtons>

							<AddFieldWidget />
							<MapContent measurementActive={measurementActive}>
								{organizationFieldsData && (
									<FieldsLayer
										fieldUris={organizationFieldsData.map(x => x.uri)}
										measurementActive={measurementActive}
									/>
								)}
							</MapContent>
						</>
					}
				/>
			</MapProvider>
		</AuthedLayout>
	)
}
