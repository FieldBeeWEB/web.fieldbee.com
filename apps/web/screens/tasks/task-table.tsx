import { MeasurementType, TasksResponse } from '@fieldbee/api'
import { Dropdown, DropdownMenuItem, Stack, theme } from '@fieldbee/ui'
import { Gauge, gaugeClasses } from '@fieldbee/ui/charts'
import {
	Box,
	Checkbox,
	Grid,
	IconButton,
	ListItemIcon,
	TableCell,
	TableRow,
	Typography,
} from '@fieldbee/ui/components'
import ExportIcon from '@fieldbee/ui/custom-icons/ExportIcon'
import * as TaskIcon from '@fieldbee/ui/custom-icons/tasks'
import WrapLineIcon from '@fieldbee/ui/custom-icons/WrapLineIcon'
import DateRange from '@fieldbee/ui/date-range'
import DropdownNestedMenuItem from '@fieldbee/ui/dropdown-new/NestedMenuItem'
import { Delete, Edit, MoreVert } from '@fieldbee/ui/icons'
import React from 'react'
import {
	getMeasurementInCurrentUnit,
	getMeasurementString,
} from '../../helpers/format-area'
import { statusName } from './task-list'
import { OPERATION } from './task-list-item'

interface Props {
	group: TasksResponse[]
	name: keyof typeof statusName
}

export const operationIcons: Record<OPERATION, JSX.Element> = {
	[OPERATION.FERTILIZING]: (
		<TaskIcon.FertilizingIcon sx={{ width: '42px', height: '42px' }} />
	),
	[OPERATION.HARVESTING]: (
		<TaskIcon.HarvestingIcon sx={{ width: '42px', height: '42px' }} />
	),
	[OPERATION.HAYMAKING]: (
		<TaskIcon.HaymakingIcon sx={{ width: '42px', height: '42px' }} />
	),
	[OPERATION.PLANTING]: (
		<TaskIcon.PlantingIcon sx={{ width: '42px', height: '42px' }} />
	),
	[OPERATION.SPRAYING]: (
		<TaskIcon.SprayingIcon sx={{ width: '42px', height: '42px' }} />
	),
	[OPERATION.TILLING]: (
		<TaskIcon.TillingIcon sx={{ width: '42px', height: '42px' }} />
	),
	[OPERATION.OTHER]: (
		<TaskIcon.OtherIcon sx={{ width: '42px', height: '42px' }} />
	),
}

export default function TaskTable({ group, name }: Props) {
	const [selected, setSelected] = React.useState<string[]>([])

	const toggleSelected = (uri: string) => {
		if (selected.includes(uri)) {
			setSelected(selected.filter(item => item !== uri))
		} else {
			setSelected([...selected, uri])
		}
	}

	const operationIcon = (name: string): JSX.Element => {
		const operationKey = OPERATION[name.toUpperCase() as keyof typeof OPERATION]
		return (
			operationIcons[operationKey] || (
				<TaskIcon.OtherIcon width={24} height={24} />
			)
		)
	}
	return (
		<React.Fragment>
			{group.map(task => (
				<TableRow
					onClick={() => toggleSelected(task.uri)}
					sx={{
						bgcolor: selected.includes(task.uri)
							? theme.palette.mix_shades[200]
							: 'none',
						borderLeft: selected.includes(task.uri)
							? `2px solid ${theme.palette.primary_shades[500]}`
							: `2px solid transparent`,
						borderRight: '2px solid transparent',
						':hover': {
							cursor: 'pointer',
							bgcolor: theme.palette.mix_shades[200],
						},
					}}
					key={task.uri}
				>
					<TableCell padding='checkbox'>
						<Checkbox
							sx={{
								'.MuiCheckbox-root': {
									display: 'inline-flex',
								},
							}}
							checked={selected.includes(task.uri)}
						/>
					</TableCell>
					<TableCell>
						<Stack direction={'row'} alignItems={'center'}>
							{operationIcon(task.operation.entityType.name.toLowerCase())}
							<Typography variant={'subtitle1'}>{task.taskName}</Typography>
						</Stack>
					</TableCell>
					<TableCell>
						<DateRange
							startDate={task.taskStartDate || ''}
							endDate={task.taskEndDate || ''}
						/>
					</TableCell>
					<TableCell>
						{task.fields.map((field, index) => {
							const fieldProgressActual = getMeasurementInCurrentUnit(
								field.progress?.actual || 0,
								MeasurementType.AREA
							)
							const fieldProgressPlan = getMeasurementInCurrentUnit(
								field.progress?.plan || 0,
								MeasurementType.AREA
							)
							const fieldProgressPlanWithMUCode = getMeasurementString(
								field.progress?.plan || 0,
								MeasurementType.AREA
							)
							return (
								<Grid container spacing={2} key={index} margin={0} padding={0}>
									<Grid
										item
										xs={4}
										sx={{
											borderBottom:
												index === task.fields.length - 1
													? 'none'
													: `1px solid ${theme.palette.secondary_shades[400]}`,
											paddingX: '0px !important',
											paddingY: '4px !important',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<Typography variant={'subtitle1'}>{field.name}</Typography>
									</Grid>
									<Grid
										item
										xs={4}
										sx={{
											borderBottom:
												index === task.fields.length - 1
													? 'none'
													: `1px solid ${theme.palette.secondary_shades[400]}`,
											paddingX: '0px !important',
											paddingY: '4px !important',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										{field.crop ? (
											<Stack
												direction={'row'}
												alignItems={'center'}
												gap={1}
												spacing={0}
											>
												<Box
													sx={{
														width: '24px',
														height: '24px',
														borderRadius: '100%',
														background: field.crop?.colorHex,
													}}
												/>
												<Typography variant={'subtitle1'}>
													{field.crop?.name}
												</Typography>
											</Stack>
										) : (
											<Typography variant={'subtitle1'}>-- / --</Typography>
										)}
									</Grid>
									<Grid
										item
										xs={4}
										sx={{
											borderBottom:
												index === task.fields.length - 1
													? 'none'
													: `1px solid ${theme.palette.secondary_shades[400]}`,
											paddingX: '0px !important',
											paddingY: '4px !important',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										{field.progress ? (
											<>
												<Box height={50} width={50}>
													<Gauge
														value={
															fieldProgressActual &&
															fieldProgressPlan &&
															fieldProgressActual > fieldProgressPlan
																? fieldProgressPlan
																: fieldProgressActual
														}
														startAngle={135}
														endAngle={-135}
														valueMax={fieldProgressPlan || 0}
														sx={() => ({
															[`& .${gaugeClasses.valueArc}`]: {
																fill:
																	fieldProgressActual &&
																	fieldProgressPlan &&
																	fieldProgressActual >= fieldProgressPlan
																		? '#A1C45A'
																		: '#FFB640',
															},
														})}
														text={() => ``}
													/>
												</Box>

												<Typography variant='body1' marginX={'auto'}>
													{fieldProgressActual} / {fieldProgressPlanWithMUCode}
												</Typography>
											</>
										) : (
											<>
												<Box height={50} width={50}>
													<Gauge
														value={0}
														valueMax={0}
														startAngle={135}
														endAngle={-135}
														sx={() => ({
															[`& .${gaugeClasses.referenceArc}`]: {
																fill: '#6BBDFF',
															},
														})}
														text={() => ``}
													/>
												</Box>

												<Typography variant='body1' marginX={'auto'}>
													-- / --
												</Typography>
											</>
										)}
									</Grid>
								</Grid>
							)
						})}
					</TableCell>
					<TableCell>
						<Typography variant='body1'>{statusName[name]}</Typography>
					</TableCell>
					<TableCell padding='checkbox'>
						<Box>
							<Dropdown
								trigger={
									<IconButton size='large' aria-label='more'>
										<MoreVert />
									</IconButton>
								}
								menu={[
									<DropdownMenuItem key='rename'>
										<ListItemIcon>
											<Edit />
										</ListItemIcon>
										<span>Rename</span>
									</DropdownMenuItem>,
									<DropdownNestedMenuItem
										label='Change status'
										key='change'
										leftIcon={
											<ListItemIcon>
												<WrapLineIcon />
											</ListItemIcon>
										}
										menu={[
											<DropdownMenuItem key='report-pdf'>
												Open
											</DropdownMenuItem>,
											<DropdownMenuItem key='excel'>
												In process
											</DropdownMenuItem>,
											<DropdownMenuItem key='csv'>Completed</DropdownMenuItem>,
										]}
									/>,
									<DropdownMenuItem key='export'>
										<ListItemIcon>
											<ExportIcon />
										</ListItemIcon>
										<span>Export</span>
									</DropdownMenuItem>,
									<DropdownMenuItem key='delete'>
										<ListItemIcon>
											<Delete />
										</ListItemIcon>
										<span>Delete</span>
									</DropdownMenuItem>,
								]}
							/>
						</Box>
					</TableCell>
				</TableRow>
			))}
		</React.Fragment>
	)
}
