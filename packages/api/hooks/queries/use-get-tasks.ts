import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../config'
import { queryKeys } from './query-keys'
import { Operation } from './use-get-organization-fields'

export interface TaskProgress {
	actual: number
	plan: number
	uri: string
}

export interface Crop {
	startMonth: number
	name: string
	durationCycle: number
	colorHex: string
	uri: string
}

export interface TaskField {
	area: number
	bbox: string
	name: string
	areaSi: number
	progress: TaskProgress
	id: number
	uri: string
	crop: Crop
	linkUri: string
}

export interface WorkerProgress {
	actual: number
	plan: number
	uri: string
}

export interface Worker {
	org: string
	photoPath: string
	name: string
	progress: WorkerProgress
	uri: string
	user: string
	email: string
	desc: string
	linkUri: string
}

export interface TasksResponse {
	owner: string
	orgName: string
	description: string
	uri: string
	taskEndDate: string
	materials: any[]
	taskStartDate: string
	progress: TaskProgress
	taskName: string
	fields: TaskField[]
	operation: Operation
	workers: Worker[]
	taskStatus: string
}

export const useGetTasks = () =>
	useQuery(queryKeys.getTasks, () =>
		axiosInstance<[TasksResponse]>({
			method: 'GET',
			url: '/RESTService/document/list?type=TASK',
		}).then(res => res.data)
	)
