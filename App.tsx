import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from './src/components/TaskListScreen';
import TaskDetailScreen from './src/components/TaskDetailScreen';
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
type RootStackParamList = {
	Home: undefined,
	TaskDetail: { tasks: Task[], taskIndex: number }
}

export type TaskDetailProps = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>
export type TaskListProps = NativeStackScreenProps<RootStackParamList, 'Home'>
const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name='Home' component={TaskListScreen} />
				<Stack.Screen name='TaskDetail' component={TaskDetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
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
