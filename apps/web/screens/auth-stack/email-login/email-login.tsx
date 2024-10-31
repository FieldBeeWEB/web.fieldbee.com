import {
	useGetUpdatedMeasurementUnits,
	useLogin,
	useLoginWithGoogle,
} from '@fieldbee/api'
import { Stack } from '@fieldbee/ui'
import { Link } from '@fieldbee/ui/components'
import { addMinutes } from 'date-fns'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { pagePaths } from '../../../config/page-paths'
import { setMeasurementUnits } from '../../../helpers/format-area'
import { setUserToken } from '../../../helpers/user-token'
import { PhrasesTranslationKeys } from '../../../localization'
import AuthLayout from '../auth-layout'
import LoginForm, { LoginFormSchema } from './login-form'

export default function EmailLogin() {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = React.useState<null | string>(null)

	const { id_token: idToken } = router.query
	const { mutateAsync: login, isLoading } = useLogin()
	const { mutateAsync: loginWithGoogle } = useLoginWithGoogle()
	const { mutateAsync: getMeasurementUnits } = useGetUpdatedMeasurementUnits()

	const onLogin = async (values: LoginFormSchema) => {
		await login(values, {
			onSuccess: async data => {
				setUserToken({
					...data,
					expires_at: addMinutes(new Date(), data.expires_in),
				})
				const measurements = await getMeasurementUnits(null)
				setMeasurementUnits(measurements)
				router.push(pagePaths.authPages.home)
			},
			onError: () => {
				setErrorMessage(t(PhrasesTranslationKeys.InvalidLoginCredentials))
			},
		})
	}

	React.useEffect(() => {
		async function loginToSystem(token: string) {
			try {
				const { data, status } = await loginWithGoogle({
					code: token,
				})
				if (status !== 200) {
					setErrorMessage(t(PhrasesTranslationKeys.InvalidLoginCredentials))
				} else {
					setUserToken({
						...data,
						expires_at: addMinutes(new Date(), data.expires_in),
					})
					router.push(pagePaths.authPages.home)
				}
			} catch (e) {
				setErrorMessage(t(PhrasesTranslationKeys.InvalidLoginCredentials))
			}
		}
		if (router.isReady && idToken) {
			loginToSystem(idToken.toString())
		}
	}, [router, idToken, loginWithGoogle])

	return (
		<AuthLayout
			headline={t(PhrasesTranslationKeys.LoginToYourFieldBeeAccount).toString()}
			displayBackButton={true}
		>
			<LoginForm
				loading={isLoading}
				onSubmit={onLogin}
				errorMessage={errorMessage}
			/>
			<Stack
				width='calc(100% - 48px)'
				direction='row'
				justifyContent='space-between'
				position={'absolute'}
				bottom={'16px'}
				marginTop={0}
				left={24}
			>
				<Link
					href={pagePaths.publicPages.resetPassword}
					underline='none'
					color='#CAC4D0'
				>
					{t(PhrasesTranslationKeys.ForgotPassword)}?
				</Link>
				<Link
					href={pagePaths.publicPages.signUp}
					underline='none'
					color='#CAC4D0'
				>
					{t(PhrasesTranslationKeys.SignUp)}
				</Link>
			</Stack>
		</AuthLayout>
	)
}
