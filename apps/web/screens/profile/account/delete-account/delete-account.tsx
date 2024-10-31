import { useDeleteAccount } from '@fieldbee/api'
import { Button, ModalBody, ModalContent, Stack } from '@fieldbee/ui'
import {
	FormControl,
	FormHelperText,
	OutlinedInput,
	Typography,
} from '@fieldbee/ui/components'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { pagePaths } from '../../../../config/page-paths'
import { toast } from '../../../../helpers/toast'
import {
	PhrasesTranslationKeys,
	SentencesTranslationKeys,
	SingleWordsTranslationKeys,
} from '../../../../localization'

const DELETE_CONFIRMATION_TEXT = 'DELETE'

export default function DeleteAccount() {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)

	const { mutateAsync: deleteAccount, isLoading } = useDeleteAccount()

	const [inputContent, setInputContent] = React.useState('')
	const [error, setError] = React.useState<null | string>(null)
	const handleOpen = () => {
		setInputContent('')
		setOpen(true)
		setError(null)
	}
	const handleClose = () => {
		setInputContent('')
		setOpen(false)
		setError(null)
	}

	const onDeleteAccount = async () => {
		if (inputContent === DELETE_CONFIRMATION_TEXT) {
			setError(null)
			await deleteAccount(undefined, {
				onSuccess: () => {
					router.push(pagePaths.logout)
				},
				onError: () => {
					toast.error(t(PhrasesTranslationKeys.SomethingWentWrong))
				},
			})
		} else {
			setError(
				`${t(
					PhrasesTranslationKeys.PleaseEnter
				)} ${DELETE_CONFIRMATION_TEXT} ${t(PhrasesTranslationKeys.ToConfirm)}`
			)
		}
	}

	return (
		<>
			<Button
				color='error'
				onClick={handleOpen}
				sx={{
					width: 150,
				}}
			>
				<Typography variant='body1' fontWeight={600}>
					{t(PhrasesTranslationKeys.DeleteAccount)}
				</Typography>
			</Button>
			{open && (
				<ModalContent
					open={open}
					handleClose={handleClose}
					isDialog={true}
					hasBottomBorder={false}
					modalTitle={t(PhrasesTranslationKeys.DeleteAccount).toString()}
				>
					<ModalBody flexDirection='column'>
						<Stack spacing={2} padding='0 16px 16px 16px'>
							<Typography>
								{t(
									SentencesTranslationKeys.AreYouSureYouWantDeleteYourAccountAllDataWillBeLost
								)}
							</Typography>
							<Typography>
								{t(PhrasesTranslationKeys.PleaseEnter)}{' '}
								{DELETE_CONFIRMATION_TEXT} {t(PhrasesTranslationKeys.ToConfirm)}
							</Typography>
							<FormControl error={!!(error && error)} variant='outlined'>
								<OutlinedInput
									value={inputContent}
									onChange={e => {
										setError(null)
										setInputContent(e.target.value)
									}}
								/>
								{error && <FormHelperText>{error}</FormHelperText>}
							</FormControl>
						</Stack>
						<Stack
							direction='row'
							padding='16px'
							sx={theme => ({
								borderTop: `1px solid ${theme.palette.secondary_shades[200]}`,
							})}
							spacing={1}
						>
							<Button fullWidth variant='outlined' onClick={handleClose}>
								{t(SingleWordsTranslationKeys.Cancel)}
							</Button>
							<Button fullWidth color='error' onClick={onDeleteAccount}>
								{t(PhrasesTranslationKeys.DeleteAccount)}
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			)}
		</>
	)
}
