/* eslint-disable turbo/no-undeclared-env-vars */
import {
	queryKeys,
	useGetProfile,
	useQueryClient,
	useUpdateProfileInfo,
} from '@fieldbee/api'
import { Loader } from '@fieldbee/ui'
import { format } from 'date-fns'
import { t } from 'i18next'
import { DATE_FORMAT } from '../../../helpers/date-format'
import { toast } from '../../../helpers/toast'
import { PhrasesTranslationKeys } from '../../../localization'
import AccountForm, { AccountFormSchema } from './account-form'

export default function AccountPanel() {
	const queryClient = useQueryClient()
	const { isLoading, data } = useGetProfile()
	const { mutateAsync: updateProfile, isLoading: isUpdating } =
		useUpdateProfileInfo()

	const onAccountUpdate = async (values: AccountFormSchema) => {
		await updateProfile(
			{
				...values,
				birthday: values.birthday
					? format(values.birthday, DATE_FORMAT)
					: undefined,
				gender:
					values.gender && values.gender.length > 0 ? values.gender : undefined,
				photoPath: data?.photoPath,
				uri: data?.uri,
			},
			{
				onSuccess: async () => {
					await queryClient.refetchQueries({
						queryKey: queryKeys.getProfile,
					})
				},
				onError: () => {
					toast.error(t(PhrasesTranslationKeys.SomethingWentWrong))
				},
			}
		)
	}
	if (isLoading) {
		return <Loader margin='auto' />
	}

	return (
		<>
			{/* {data && (
				<Stack
					direction='row'
					alignItems='center'
					marginLeft={'auto'}
					padding={2}
				>
					{data.photoPath ? (
						<img
							width={80}
							height={80}
							alt='profile photo'
							src={`${process.env.NEXT_PUBLIC_API_URL}/image-service/resource/image/${data.photoPath}`}
						/>
					) : (
						<NoPhotographyRounded sx={{ fontSize: 80 }} color='primary' />
					)}
					<Stack color='white' spacing={1}>
						<Typography>{data.firstName}</Typography>
						<Typography>{data.email}</Typography>
						<ChangePhoto />
					</Stack>
				</Stack>
			)} */}
			{data && (
				<AccountForm
					loading={isUpdating}
					onSubmit={onAccountUpdate}
					profileData={data}
				/>
			)}
		</>
	)
}
