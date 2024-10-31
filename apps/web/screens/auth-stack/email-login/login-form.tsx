import { Button, Stack } from '@fieldbee/ui'
import { FormHelperText } from '@fieldbee/ui/components'
import ClearableInput from '@fieldbee/ui/form/input/ClearableInput'
import PasswordInput from '@fieldbee/ui/form/input/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import {
	PhrasesTranslationKeys,
	SingleWordsTranslationKeys,
} from '../../../localization'

const loginValidationSchema = Yup.object({
	email: Yup.string().required(),
	password: Yup.string().required(),
})

export type LoginFormSchema = Yup.InferType<typeof loginValidationSchema>

type Props = {
	errorMessage: string | null
	loading: boolean
	onSubmit: (data: LoginFormSchema) => void
}
const LoginForm: React.FunctionComponent<Props> = ({
	loading,
	onSubmit,
	errorMessage,
}) => {
	const { control, handleSubmit } = useForm<LoginFormSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginValidationSchema),
	})

	return (
		<Stack width='100%'>
			<Controller
				name='email'
				control={control}
				render={({
					field: { onChange, onBlur, value },
					fieldState: { error },
				}) => (
					<ClearableInput
						type='email'
						label={t(PhrasesTranslationKeys.EmailOrLogin)}
						error={error}
						helperText={error && error.message}
						value={value}
						onBlur={onBlur}
						onChange={onChange}
						placeholder={t(PhrasesTranslationKeys.EmailOrLogin).toString()}
						clearAriaLabel='Clear input'
					/>
				)}
			/>
			<Controller
				name='password'
				control={control}
				render={({
					field: { onChange, onBlur, value },
					fieldState: { error },
				}) => (
					<PasswordInput
						label={t(SingleWordsTranslationKeys.Password).toString()}
						togglePasswordAriaLabel={t(
							PhrasesTranslationKeys.TogglePasswordVisibility
						).toString()}
						value={value}
						onBlur={onBlur}
						onChange={onChange}
						placeholder={t(SingleWordsTranslationKeys.Password).toString()}
						error={error}
					/>
				)}
			/>
			{errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}

			<Button
				onClick={handleSubmit(onSubmit)}
				size='medium'
				loading={loading}
				sx={{ marginTop: '32px !important' }}
			>
				{t(SingleWordsTranslationKeys.Login)}
			</Button>
		</Stack>
	)
}

export default LoginForm
