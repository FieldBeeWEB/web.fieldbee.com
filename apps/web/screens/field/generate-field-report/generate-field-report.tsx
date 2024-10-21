import { ReportExportFormat } from '@fieldbee/api'
import { DropdownMenuItem } from '@fieldbee/ui'
import { ListItemIcon } from '@fieldbee/ui/components'
import ExportIcon from '@fieldbee/ui/custom-icons/ExportIcon'
import DropdownNestedMenuItem from '@fieldbee/ui/dropdown-new/NestedMenuItem'
import { t } from 'i18next'
import * as React from 'react'
import { PhrasesTranslationKeys } from '../../../localization'
import BackgroundDownloadContext from '../../background-download/background-download-context'

interface Props {
	uri: string
	key: string
}

export default function GenerateFieldReport({ uri, key }: Props) {
	const { triggerDownload } = React.useContext(BackgroundDownloadContext)

	return (
		<DropdownNestedMenuItem
			label='Generate'
			key={key}
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
							uri: uri,
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
							uri: uri,
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
							uri: uri,
						})
					}}
					key='csv'
				>
					{t(PhrasesTranslationKeys.DownloadAsExcelCSV)}
				</DropdownMenuItem>,
			]}
		/>
	)
}
