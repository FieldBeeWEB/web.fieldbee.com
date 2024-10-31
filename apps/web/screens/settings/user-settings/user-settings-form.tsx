import { MeasurementUnit } from '@fieldbee/api'
import { GetUserMeasureUnits } from '@fieldbee/api/hooks/queries/use-get-user-measure-units'
import { Button, Stack, theme } from '@fieldbee/ui'
import {
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
	Typography,
} from '@fieldbee/ui/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { SingleWordsTranslationKeys } from '../../../localization'

const userSettingsValidationSchema = Yup.object({
	length: Yup.string().required(),
	area: Yup.string().required(),
	speed: Yup.string().required(),
	language: Yup.string(),
})

export type UserSettingsFormSchema = Yup.InferType<
	typeof userSettingsValidationSchema
>

type Props = {
	loading: boolean
	onSubmit: (data: UserSettingsFormSchema) => void
	areas: [MeasurementUnit] | undefined
	lengths: [MeasurementUnit] | undefined
	speeds: [MeasurementUnit] | undefined
	userMeasureUnits: GetUserMeasureUnits | undefined
}
const UserSettingsForm: React.FunctionComponent<Props> = ({
	loading,
	onSubmit,
	lengths,
	areas,
	speeds,
	userMeasureUnits,
}) => {
	const { control, handleSubmit, formState } = useForm<UserSettingsFormSchema>({
		defaultValues: {
			length: userMeasureUnits ? userMeasureUnits.length.targetMU.uri : '',
			area: userMeasureUnits ? userMeasureUnits.area.targetMU.uri : '',
			speed: userMeasureUnits ? userMeasureUnits.speed.targetMU.uri : '',
			language: 'ENG',
		},
		resolver: yupResolver(userSettingsValidationSchema),
	})
	return (
		<Stack height='100%' padding={0} spacing={0}>
			<Stack
				spacing={2}
				width='calc(100% - 32px)'
				padding={2}
				overflow='scroll'
				marginBottom='auto'
			>
				<Typography>Language</Typography>
				<Controller
					name='language'
					control={control}
					render={({
						field: { onChange, onBlur, value },
						fieldState: { error },
					}) => (
						<FormControl error={!!(error && error.message)} variant='outlined'>
							<Select
								labelId='select-language-label'
								id='select-language'
								value={value}
								onChange={onChange}
								onBlur={onBlur}
							>
								<MenuItem key='ENG' value='ENG'>
									English
								</MenuItem>
							</Select>
							{error && (
								<FormHelperText id='component-error-text'>
									{error.message}
								</FormHelperText>
							)}
						</FormControl>
					)}
				/>
				<Typography>Length</Typography>
				{lengths && (
					<Controller
						name='length'
						control={control}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<FormControl
								error={!!(error && error.message)}
								variant='outlined'
							>
								<Select
									labelId='select-length-label'
									id='select-length'
									value={value}
									onChange={onChange}
									onBlur={onBlur}
								>
									{lengths.map(length => (
										<MenuItem key={length.name} value={length.uri}>
											{t(length.name)}
										</MenuItem>
									))}
								</Select>
								{error && (
									<FormHelperText id='component-error-text'>
										{error.message}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				)}
				<Typography>Area</Typography>
				{areas && (
					<Controller
						name='area'
						control={control}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<FormControl
								error={!!(error && error.message)}
								variant='outlined'
							>
								<Select
									labelId='select-area-label'
									id='select-area'
									value={value}
									onChange={onChange}
									onBlur={onBlur}
								>
									{areas.map(area => (
										<MenuItem key={area.name} value={area.uri}>
											{t(area.name)}
										</MenuItem>
									))}
								</Select>
								{error && (
									<FormHelperText id='component-error-text'>
										{error.message}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				)}
				<Typography>Speed</Typography>
				{speeds && (
					<Controller
						name='speed'
						control={control}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<FormControl
								error={!!(error && error.message)}
								variant='outlined'
							>
								<Select
									labelId='select-soeed-label'
									id='select-soeed'
									value={value}
									onChange={onChange}
									onBlur={onBlur}
								>
									{speeds.map(speed => (
										<MenuItem key={speed.name} value={speed.uri}>
											{t(speed.name)}
										</MenuItem>
									))}
								</Select>
								{error && (
									<FormHelperText id='component-error-text'>
										{error.message}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				)}
				<Stack direction={'row'} justifyContent={'end'} alignItems={'center'}>
					<Button
						onClick={handleSubmit(onSubmit)}
						size='large'
						loading={loading}
						disabled={!formState.isDirty}
						sx={{
							width: 150,
						}}
					>
						<Typography
							variant='body1'
							color={theme.palette.secondary_shades[200]}
							fontWeight={600}
						>
							{t(SingleWordsTranslationKeys.Save)}
						</Typography>
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}

export default UserSettingsForm
