import { MeasurementType, TasksResponse } from '@fieldbee/api'
import { Stack, theme } from '@fieldbee/ui'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from '@fieldbee/ui/components'
import { ArrowDropDown } from '@fieldbee/ui/icons'
import { t } from 'i18next'
import { getMeasurementString } from '../../helpers/format-area'
import {
	PhrasesTranslationKeys,
	SingleWordsTranslationKeys,
} from '../../localization'
import TaskListItem from './task-list-item'

interface Props {
	group: TasksResponse[]
	name: keyof typeof statusName
}

export const statusName = {
	OPEN: t(PhrasesTranslationKeys.OPEN).toString(),
	IN_WORK_ON_FO: t(PhrasesTranslationKeys.IN_WORK_ON_FO).toString(),
	EXECUTED: t(PhrasesTranslationKeys.EXECUTED).toString(),
}

export const statusColor = {
	OPEN: '#03A9F4',
	IN_WORK_ON_FO: '#FFA726',
	EXECUTED: '#66BB6A',
}

export default function TaskList({ group, name }: Props) {
	return (
		<Accordion
			defaultExpanded={name === 'OPEN'}
			sx={{
				'.Mui-expanded.MuiAccordionSummary-root': {
					borderBottom: `1px solid ${theme.palette.primary.main}`,
					backgroundColor: theme.palette.mix.main,
					margin: '0 !important',
				},
				'.MuiAccordionSummary-root': {
					minHeight: 64,
					bgcolor: theme.palette.secondary_shades[200],
				},
				'.Mui-expanded': {
					margin: '0 !important',
					'& + .MuiAccordionSummary-expandIconWrapper': {
						color: theme.palette.primary.main,
					},
				},
			}}
		>
			<AccordionSummary
				expandIcon={<ArrowDropDown />}
				aria-controls={`${name}-content`}
				id={`${name}-task`}
			>
				<Stack direction={'row'} alignItems={'center'} gap={2}>
					<Typography
						variant='body1'
						sx={{
							width: 85,
						}}
					>
						{statusName[name]}
					</Typography>

					<Typography
						variant='body2'
						sx={{
							width: 65,
							textAlign: 'center',
						}}
					>
						{group.length}{' '}
						{group.length > 1
							? t(SingleWordsTranslationKeys.Tasks)
							: t(SingleWordsTranslationKeys.Task)}
					</Typography>

					<Typography
						variant='body2'
						sx={{
							width: 65,
							textAlign: 'center',
						}}
					>
						{getMeasurementString(
							group
								.map(g => g.fields.map(field => field.areaSi))
								.flat()
								.reduce((a, b) => a + b, 0),
							MeasurementType.AREA
						)}
					</Typography>
				</Stack>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					paddingX: 1,
					paddingY: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					bgcolor: theme.palette.secondary.main,
				}}
			>
				{group.map((task, index) => (
					<TaskListItem task={task} key={index} />
				))}
			</AccordionDetails>
		</Accordion>
	)
}
