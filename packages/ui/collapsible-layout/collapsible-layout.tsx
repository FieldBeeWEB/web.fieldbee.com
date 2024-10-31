import { Box, Collapse, Stack } from '@mui/material'
import * as React from 'react'
import { ExpandBadge } from '../ExpandBadge'

type LeftSideWidth = 'small' | 'normal'

const SMALL_WIDTH = 272
const NORMAL_WIDTH = 344

interface Props {
	leftComponent: React.ReactNode
	rightComponent: React.ReactNode
	expandedLabel: string
	narrowedLabel: string
	leftSideWidth?: LeftSideWidth
}

const CollapsibleLayout: React.FunctionComponent<Props> = ({
	leftComponent,
	rightComponent,
	expandedLabel,
	narrowedLabel,
	leftSideWidth = 'normal',
}) => {
	const [expanded, setExpanded] = React.useState<boolean>(false)
	const handleExpanded = React.useCallback(() => {
		setExpanded(p => !p)
	}, [])

	return (
		<Stack width='100%' height='calc(100vh - 65px)' direction='row' spacing={0}>
			<Collapse in={expanded} orientation='horizontal'>
				<Stack
					width={`${leftSideWidth === 'small' ? SMALL_WIDTH : NORMAL_WIDTH}px`}
					direction='column'
					height='100%'
					spacing={0}
				>
					{leftComponent}
				</Stack>
			</Collapse>
			<Box display='flex' flex={1} flexDirection='column' position='relative'>
				<ExpandBadge
					onClick={() => handleExpanded()}
					expanded={expanded}
					expandedLabel={expandedLabel}
					narrowedLabel={narrowedLabel}
				/>
				{rightComponent}
			</Box>
		</Stack>
	)
}

export default CollapsibleLayout
