import { TasksResponse } from '@fieldbee/api'
import { Dropdown, DropdownMenuItem, Stack, theme } from '@fieldbee/ui'
import {
	Box,
	Checkbox,
	IconButton,
	ListItemIcon,
	Typography,
} from '@fieldbee/ui/components'

import ExportIcon from '@fieldbee/ui/custom-icons/ExportIcon'
import * as TaskIcon from '@fieldbee/ui/custom-icons/tasks'
import WrapLineIcon from '@fieldbee/ui/custom-icons/WrapLineIcon'
import DropdownNestedMenuItem from '@fieldbee/ui/dropdown-new/NestedMenuItem'

import { Delete, Edit, MoreVert } from '@fieldbee/ui/icons'

import React from 'react'
import { OPERATION, operationIcons } from './task-list-item'

interface ITaskItem {
	task: TasksResponse
}

export const TaskKanbanItem = ({ task }: ITaskItem) => {
	const [selected, setSelected] = React.useState<string>('')

	const operationIcon = (name: string): JSX.Element => {
		const operationKey = OPERATION[name.toUpperCase() as keyof typeof OPERATION]
		return (
			operationIcons[operationKey] || (
				<TaskIcon.OtherIcon width={24} height={24} />
			)
		)
	}

	return (
		<Stack
			padding={1.5}
			bgcolor={
				selected === task.uri
					? theme.palette.mix_shades[200]
					: theme.palette.secondary_shades[200]
			}
			border={
				selected === task.uri
					? `1px solid ${theme.palette.primary_shades[500]}`
					: `1px solid ${theme.palette.secondary_shades[300]}`
			}
			borderRadius={0.5}
			direction={'column'}
			gap={1}
			spacing={0}
			sx={{
				':hover': {
					cursor: 'pointer',
					borderColor: theme.palette.primary_shades[500],
					bgcolor: theme.palette.mix_shades[200],
				},
			}}
			onClick={() =>
				selected === task.uri ? setSelected('') : setSelected(task.uri)
			}
		>
			<Stack
				direction={'row'}
				alignItems={'center'}
				justifyContent={'space-between'}
				borderBottom={`2px solid ${theme.palette.secondary_shades[300]}`}
			>
				<Checkbox
					sx={{
						'.MuiCheckbox-root': {
							display: 'inline-flex',
							padding: '5px',
						},
					}}
					checked={selected === task.uri}
				/>
				<Typography variant='subtitle1'>
					{new Intl.DateTimeFormat('en-GB', {
						day: '2-digit',
						month: 'short',
						year: 'numeric',
					}).format(new Date(task.taskStartDate))}
					{task.taskEndDate &&
						` - ${new Intl.DateTimeFormat('en-GB', {
							day: '2-digit',
							month: 'short',
							year: 'numeric',
						}).format(new Date(task.taskEndDate))}`}
				</Typography>
				<Box marginLeft={'auto'}>
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
									<DropdownMenuItem key='report-pdf'>Open</DropdownMenuItem>,
									<DropdownMenuItem key='excel'>In process</DropdownMenuItem>,
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
			</Stack>

			<Stack
				direction={'row'}
				alignItems={'center'}
				paddingBottom={1}
				borderBottom={`2px solid ${theme.palette.secondary_shades[300]}`}
			>
				{operationIcon(task.operation.entityType.name.toLowerCase())}
				<Typography variant='h6'>{task.taskName}</Typography>
			</Stack>
			<Stack
				paddingBottom={task.fields[0]?.crop ? 1 : 0}
				borderBottom={
					task.fields[0]?.crop
						? `2px solid ${theme.palette.secondary_shades[300]}`
						: 'none'
				}
			>
				<Typography variant={'subtitle1'}>
					{task.fields.map(field => field.name).join(', ')}{' '}
				</Typography>
			</Stack>
			{task.fields[0]?.crop && (
				<>
					<Stack direction={'row'} alignItems={'center'} gap={1} spacing={0}>
						<Box
							sx={{
								width: '24px',
								height: '24px',
								borderRadius: '100%',
								background: task.fields[0]?.crop?.colorHex,
							}}
						/>
						<Typography variant={'subtitle1'}>
							{task.fields[0]?.crop?.name}
						</Typography>
					</Stack>
				</>
			)}
		</Stack>
	)
}
