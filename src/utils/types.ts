import type { NativeStackScreenProps } from '@react-navigation/native-stack';
export type Task = {
	contractNumber: string
	name: string
	status: string
	birthdate: string
	gender: string
	address: string,
	phone: string,
	id: string
}

// The following are the type definitions for the parameters of TaskDetailScreen and TaskListScreen.
export type RootStackParamList = {
    Home: undefined,
    TaskDetail: { tasks: Task[], taskIndex: number, filterBy?: 'done' | 'new' | 'escalated' }
}

export type TaskDetailProps = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>
export type TaskListProps = NativeStackScreenProps<RootStackParamList, 'Home'>