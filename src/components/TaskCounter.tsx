import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { TaskContext } from '../../App';
import { useContext } from 'react';

export default function TaskCounter() {
    const taskContext = useContext(TaskContext)
    const currentTime = Date.now()

    const tasksCompletedInLastHour = taskContext.taskArray.filter(task => task.completionTime !== undefined && currentTime - task.completionTime < 60 * 60 * 1000)

    return (
        <View>
            <Text>Number of tasks completed in last hour: {tasksCompletedInLastHour.length}</Text>
        </View>
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
