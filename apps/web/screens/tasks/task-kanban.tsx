import { TasksResponse } from '@fieldbee/api'
import { Stack, theme } from '@fieldbee/ui'
import { Box, Typography } from '@fieldbee/ui/components'
import { statusColor, statusName } from './task-list'

interface Props {
	group: TasksResponse[]
	name: keyof typeof statusName
	handleSelectGroup: (groupName: string) => void
	selectedGroup: string
}

const TaskKanban = ({
	group,
	name,
	handleSelectGroup,
	selectedGroup,
}: Props) => {
	return (
		<Stack direction={'column'} spacing={0} gap={2} width={'30%'}>
			<Box
				sx={{
					bgcolor: theme.palette.secondary_shades[200],
					borderRadius: 0.5,
					borderTop: `2px solid ${statusColor[name]}`,
				}}
			>
				<Typography
					variant='body1'
					sx={{
						paddingY: 1.75,
						textAlign: 'center',
						color: '#FFF',
					}}
				>
					{statusName[name]}
				</Typography>
			</Box>
		</Stack>
	)
}

export default TaskKanban
