import { TasksResponse } from '@fieldbee/api'
import {
	Grid,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@fieldbee/ui/components'
import { t } from 'i18next'
import { SingleWordsTranslationKeys } from '../../localization'
import TaskKanban from './task-kanban'
import TaskList, { statusName } from './task-list'
import TaskTable from './task-table'

interface Props {
	tasks: TasksResponse[]
	viewMode?: 'list' | 'kanban' | 'table'
	searchTerm: string
}

type GroupedTasks = {
	[key: string]: TasksResponse[]
}

export default function TaskGroup({
	tasks,
	viewMode = 'list',
	searchTerm,
}: Props) {
	const groupedTasks =
		tasks &&
		tasks
			.filter(x => x.taskName.toLowerCase().includes(searchTerm.toLowerCase()))
			.reduce<GroupedTasks>(
				(groups, item) => ({
					...groups,
					[item.taskStatus
						? item.taskStatus
						: t(SingleWordsTranslationKeys.Other)]: [
						...(groups[
							item.taskStatus
								? item.taskStatus
								: t(SingleWordsTranslationKeys.Other)
						] || []),
						item,
					],
				}),
				{}
			)

	const taskGroupNames = Object.keys(groupedTasks)

	const componentMap: { [key: string]: React.ComponentType<any> } = {
		list: TaskList,
		kanban: TaskKanban,
		table: TaskTable,
	}

	const getStackStyles = (viewMode: 'list' | 'kanban' | 'table') => {
		if (viewMode === 'list') {
			return {
				flexDirection: 'column' as const,
			}
		}
		if (viewMode === 'kanban') {
			return {
				flexDirection: 'row' as const,
				justifyContent: 'space-between',
				marginX: 3,
				marginY: 2,
				gap: 5,
			}
		}
		if (viewMode === 'table') {
			return {
				flexDirection: 'column' as const,
			}
		}
		return {
			flexDirection: 'column' as const,
		}
	}

	return (
		<Stack spacing={0} sx={getStackStyles(viewMode)}>
			{viewMode === 'table' ? (
				<Table padding='normal' size='small' stickyHeader>
					<TableHead>
						<TableRow
							sx={{
								height: '60px',
							}}
						>
							<TableCell></TableCell>
							<TableCell>
								<Typography variant={'h6'}>Operation</Typography>
							</TableCell>
							<TableCell>
								<Typography variant={'subtitle1'}>Period</Typography>
							</TableCell>
							<TableCell width={600}>
								<Grid container spacing={2}>
									<Grid item xs={4}>
										<Typography variant={'subtitle1'}>Field</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography variant={'subtitle1'}>Crop</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography variant={'subtitle1'}>Progress</Typography>
									</Grid>
								</Grid>
							</TableCell>
							<TableCell>
								<Typography variant={'subtitle1'}>Status</Typography>
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{taskGroupNames.reverse().map(taskName => {
							const Component = componentMap[viewMode]
							return (
								<Component
									key={taskName}
									name={taskName as keyof typeof statusName}
									group={groupedTasks[taskName]}
								/>
							)
						})}
					</TableBody>
				</Table>
			) : (
				taskGroupNames.reverse().map(taskName => {
					const Component = componentMap[viewMode]
					return (
						<Component
							key={taskName}
							name={taskName as keyof typeof statusName}
							group={groupedTasks[taskName]}
						/>
					)
				})
			)}
		</Stack>
	)
}
