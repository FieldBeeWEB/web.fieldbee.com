import { ReportExportFormat, useGetOrganizationField } from '@fieldbee/api'
import {
	Dropdown,
	DropdownMenuItem,
	Loader,
	MapButton,
	MapButtons,
	Stack,
} from '@fieldbee/ui'
import CollapsibleLayout from '@fieldbee/ui/collapsible-layout/collapsible-layout'
import { IconButton, ListItemIcon, Tabs } from '@fieldbee/ui/components'
import EditBoundariesIcon from '@fieldbee/ui/custom-icons/EditBoundariesIcon'
import ExportIcon from '@fieldbee/ui/custom-icons/ExportIcon'
import DropdownNestedMenuItem from '@fieldbee/ui/dropdown-new/NestedMenuItem'
import {
	ArrowBack,
	Delete,
	DeleteOutline,
	MoreVert,
	Print,
	SquareFoot,
	TabUnselectedOutlined,
	TextSnippetOutlined,
} from '@fieldbee/ui/icons'
import Tab from '@fieldbee/ui/Tab'
import TabPanel from '@fieldbee/ui/TabPanel'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { pagePaths } from '../../config/page-paths'
import {
	PhrasesTranslationKeys,
	SingleWordsTranslationKeys,
} from '../../localization'
import AuthedLayout from '../authed-layout'
import BackgroundDownloadContext from '../background-download/background-download-context'
import MapContent from '../map/map-content'
import MapProvider from '../map/utils/map-provider'
import LayerSelectorWidget from '../map/widgets/layer-selector-widget'
import DeleteField from './delete-field/delete-field'
import EditFieldDetails from './edit-field/edit-field-details'
import FieldChem from './field-chem'
import FieldHistory from './field-history/field-history'
import FieldPreview from './field-preview'

enum FieldActions {
	DELETE_FIELD = 'delete-field',
	EDIT_FIELD = 'edit-field',
	EDIT_BOUNDARIES = 'edit-boundaries',
}

const actions = [
	{
		icon: <DeleteOutline />,
		name: t(PhrasesTranslationKeys.DeleteField),
		key: FieldActions.DELETE_FIELD,
	},
	{
		icon: <TextSnippetOutlined />,
		name: t(PhrasesTranslationKeys.EditField),
		key: FieldActions.EDIT_FIELD,
	},
	{
		icon: <TabUnselectedOutlined />,
		name: t(PhrasesTranslationKeys.EditBoundaries),
		key: FieldActions.EDIT_BOUNDARIES,
	},
]

export default function Field() {
	const [measurementActive, setMeasurementActive] =
		React.useState<boolean>(false)

	const handleMeasurement = React.useCallback(() => {
		setMeasurementActive(p => !p)
	}, [])
	const { triggerDownload } = React.useContext(BackgroundDownloadContext)

	const [openedModal, setOpenedModal] = React.useState<string | null>(null)
	const handleClose = () => {
		setOpenedModal(null)
	}
	const router = useRouter()
	const { uri } = router.query
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	const { data: field, isLoading } = useGetOrganizationField(
		uri?.toString() || ''
	)

	if (isLoading) {
		return <Loader />
	}

	return (
		<AuthedLayout>
			<MapProvider>
				{field && (
					<CollapsibleLayout
						expandedLabel='Hide details'
						narrowedLabel='Show details'
						leftComponent={
							<>
								<Stack
									direction='row'
									justifyContent='space-between'
									alignItems='center'
									spacing={0}
									sx={theme => ({
										position: 'sticky',
										left: 0,
										top: 0,
										borderBottom: `1px solid ${theme.palette.secondary_shades[300]}`,
									})}
								>
									<IconButton
										size='large'
										aria-label='go back'
										onClick={() => {
											;() => router.push(pagePaths.authPages.fields)
										}}
									>
										<ArrowBack />
									</IconButton>
									<Tabs value={value} onChange={handleChange} centered>
										<Tab label={t(SingleWordsTranslationKeys.Details)} />
										<Tab label={t(SingleWordsTranslationKeys.Soil)} />
										<Tab label={t(SingleWordsTranslationKeys.History)} />
									</Tabs>

									<Dropdown
										trigger={
											<IconButton size='large' aria-label='more'>
												<MoreVert />
											</IconButton>
										}
										menu={[
											<DropdownMenuItem
												onClick={() => {
													router.push(
														pagePaths.authPages.editField(
															field.id.toString(),
															field.uri
														)
													)
												}}
												key='edit'
											>
												<ListItemIcon>
													<EditBoundariesIcon />
												</ListItemIcon>
												<span>Edit Boundaries</span>
											</DropdownMenuItem>,
											<DropdownNestedMenuItem
												label='Generate'
												key='generate'
												leftIcon={
													<ListItemIcon>
														<ExportIcon />
													</ListItemIcon>
												}
												menu={[
													<DropdownMenuItem
														onClick={() => {
															triggerDownload({
																format: ReportExportFormat.PDF,
																uri: field.uri,
															})
														}}
														key='report-pdf'
													>
														{t(PhrasesTranslationKeys.GenerateReportPDF)}{' '}
													</DropdownMenuItem>,
													<DropdownMenuItem
														onClick={() => {
															triggerDownload({
																format: ReportExportFormat.XLS,
																uri: field.uri,
															})
														}}
														key='excel'
													>
														{t(PhrasesTranslationKeys.GenerateReportExcelXls)}{' '}
													</DropdownMenuItem>,
													<DropdownMenuItem
														onClick={() => {
															triggerDownload({
																format: ReportExportFormat.CSV,
																uri: field.uri,
															})
														}}
														key='csv'
													>
														{t(PhrasesTranslationKeys.DownloadAsExcelCSV)}
													</DropdownMenuItem>,
												]}
											/>,

											<DropdownMenuItem
												onClick={() => window.print()}
												key='print'
											>
												<ListItemIcon>
													<Print fontSize='small' />
												</ListItemIcon>
												<span>Print</span>
											</DropdownMenuItem>,
											<DropdownMenuItem
												onClick={() => {
													setOpenedModal(FieldActions.DELETE_FIELD)
												}}
												key='delete'
											>
												<ListItemIcon>
													<Delete fontSize='small' />
												</ListItemIcon>
												Delete Field
											</DropdownMenuItem>,
										]}
									/>
								</Stack>
								<TabPanel value={value} index={0}>
									<EditFieldDetails field={field} />
								</TabPanel>
								<TabPanel value={value} index={1}>
									<FieldChem uri={field.uri} />
								</TabPanel>
								<TabPanel value={value} index={2} isDark>
									<FieldHistory field={field} />
								</TabPanel>
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
								<MapContent measurementActive={measurementActive}>
									<FieldPreview
										measurementActive={measurementActive}
										field={field}
									/>
								</MapContent>
							</>
						}
					/>
				)}
				<DeleteField
					uris={uri ? [uri.toString()] : []}
					isOpened={openedModal === FieldActions.DELETE_FIELD}
					handleClose={handleClose}
				/>
			</MapProvider>
		</AuthedLayout>
	)
}
