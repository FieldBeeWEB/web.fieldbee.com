import { useGetTasks } from '@fieldbee/api'
import { InputWithIcon, Loader, theme } from '@fieldbee/ui'
import { Box, Grid, Stack } from '@fieldbee/ui/components'
import { Search } from '@fieldbee/ui/icons'
import * as React from 'react'
import AuthedLayout from '../authed-layout'
import TaskActions from './task-actions'
import TaskGroup from './task-group'

type TViewMode = 'list' | 'kanban' | 'table'

const Tasks = () => {
	const [searchTaskTerm, setSearchTaskTerm] = React.useState<string>('')
	const [viewMode, setViewMode] = React.useState<TViewMode>('table')

	const { data, isLoading, isRefetching } = useGetTasks()

	return (
		<AuthedLayout>
			<Grid container spacing={0} height='100vh'>
				<Grid
					item
					xs={12}
					sx={theme => ({
						borderRight: `1px solid ${theme.palette.secondary_shades[400]}`,
					})}
				>
					<Stack direction='column'>
						<Stack
							direction='row'
							alignItems='center'
							spacing={0.5}
							padding={1}
							sx={theme => ({
								borderBottom: `1px solid ${theme.palette.secondary_shades[400]}`,
								backgroundColor: theme.palette.secondary_shades[200],
							})}
						>
							<InputWithIcon
								fullWidth={true}
								placeholder='Search'
								startAdornment={
									<Search sx={{ flexShrink: 0, width: 32, height: 32 }} />
								}
								value={searchTaskTerm}
								onChange={e => setSearchTaskTerm(e.target.value)}
								sx={{
									bgcolor: theme.palette.secondary_shades[200],
								}}
							/>
							<TaskActions viewMode={viewMode} setViewMode={setViewMode} />
						</Stack>
						{(isLoading || isRefetching) && (
							<Box
								height='calc(100vh - 73px)'
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}
								bgcolor={theme.palette.secondary.main}
							>
								<Loader />
							</Box>
						)}
						<Box
							height='calc(100vh - 73px)'
							sx={{
								overflowY: 'scroll',
								bgcolor: theme.palette.secondary.main,
							}}
							padding={0}
						>
							{!isLoading && !isRefetching && data && (
								<TaskGroup
									tasks={data}
									viewMode={viewMode}
									searchTerm={searchTaskTerm}
								/>
							)}
						</Box>
					</Stack>
				</Grid>
			</Grid>
		</AuthedLayout>
	)
}

export default Tasks
