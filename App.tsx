import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createContext, useState, useEffect } from 'react';
import { Task } from './src/utils/types';
import AppNavigation from './src/navigation/AppNavigation';

type TaskContext = {
	taskArray: Task[]
	updateTask?: (updatedTask: Task) => void
}
export const TaskContext = createContext<TaskContext>({ taskArray: [] })

export default function App() {
	const [taskArray, setTaskArray] = useState<Task[]>([])

	const updateTask = (updatedTask: Task) => {
		// taskArray.filter(task => task.id === updatedTask.id)
		let taskIndex = taskArray.findIndex(task => task.id === updatedTask.id)
		let newTaskArray = [...taskArray]
		newTaskArray[taskIndex] = updatedTask
		setTaskArray(newTaskArray)
	}

	const taskContext: TaskContext = {
		taskArray: taskArray,
		updateTask: updateTask
	}

	useEffect(() => {
		// get tasks from file and set them as state when the app starts
		const taskData: Task[] = require('./tasks.json')
		setTaskArray(taskData)
	}, [])

	return (
		<TaskContext.Provider
			value={taskContext}
		>
			<AppNavigation />
		</TaskContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
