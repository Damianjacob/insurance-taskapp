import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import { RootStackParamList } from '../utils/types';


const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigation() {
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
