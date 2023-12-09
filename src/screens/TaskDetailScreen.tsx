import { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Task } from 'react-native';
import { TaskDetailProps } from '../utils/types';
import GenericButton from '../components/buttons/GenericButton';
import { TaskContext } from '../../App';

const TaskDetailScreen: FC<TaskDetailProps> = ({ navigation, route }) => {
    // const [currentTask, setCurrentTask] = useState<Task | null>(null)
    // const [currentTaskIndex, setcurrentTaskIndex] = useState<number>(0)
    // console.log(route.params)
    const taskContext = useContext(TaskContext)
    const updateTaskArray = taskContext.updateTaskArray
    const updateTask = taskContext.updateTask
    // const taskArray = route.params.tasks
    const filterBy = route.params.filterBy
    // Define the task array based on whether there was a filter for the status
    const taskArray = filterBy ? taskContext.taskArray.filter(task => task.status === filterBy) : taskContext.taskArray
    const taskIndex = route.params.taskIndex
    const currentTask = taskArray[taskIndex]

    console.log('filterby:' + filterBy)
    console.log('current task: ' )
    console.log(currentTask )

    useEffect(() => {
        // let task = taskArray[taskIndex]
        // setCurrentTask(task)
    }, [])

    const skipTask = () => {
        if (taskArray.length > taskIndex) {
            navigation.navigate('TaskDetail', { tasks: taskArray, taskIndex: taskIndex + 1, filterBy })
        } else {
            Alert.alert('There are no new tasks')
        }
    }

    const markTaskAsDone = () => {
        const updatedTask = {
            ...currentTask,
            status: 'done'
        }
        if (updateTask){
            updateTask(updatedTask)
        } else {
            console.error('updateTask is undefined')
        }
    }

    const escalateTask = () => {
        const updatedTask = {
            ...currentTask,
            status: 'escalated'
        }
        if (updateTask){
            updateTask(updatedTask)
        } else {
            console.error('updateTask is undefined')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <>
                <Text style={styles.header}>task status: {currentTask.status}</Text>
                <View style={styles.taskCard}>
                    <Text style={[styles.label, { color: 'blue' }]}>Insured Person</Text>
                    <Text style={[styles.value, { color: 'blue' }]}>{currentTask.name}</Text>
                    <Text style={styles.label}>Contract Number</Text>
                    <Text style={styles.value}>{currentTask.contractNumber}</Text>
                    <View style={styles.columnContainer}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Gender</Text>
                            <Text style={styles.value}>{currentTask.gender}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Birthdate</Text>
                            <Text style={styles.value}>{currentTask.birthdate}</Text>
                        </View>

                    </View>
                    <View>
                        <Text style={styles.label}>Phone Number</Text>
                        <Text style={styles.value}>{currentTask.phone}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>{currentTask.address}</Text>
                    </View>
                </View>
            </>
            <></>

            <View style={styles.buttonRow}>
                <GenericButton
                    text='Escalate'
                    onPress={escalateTask}
                    backgroundColor='orange'
                    disable={currentTask.status !== 'new'}
                />
                <GenericButton
                    text='Skip'
                    onPress={skipTask}
                />
                <GenericButton
                    text='Mark as Done'
                    backgroundColor='green'
                    onPress={markTaskAsDone}
                    disable={currentTask.status !== 'new'}
                />
            </View>
            <GenericButton
                text='Back to Task Overview'
                onPress={() => { navigation.navigate('Home') }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    taskCard: {
        borderRadius: 5,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 20,
        padding: 10,
        // width:''
    },
    columnContainer: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    column: {
        width: '50%' // is 50% of container width
    },
    label: {
        color: 'slategray',
        marginTop: 10,
        fontSize: 16
    },
    value: {
        marginBottom: 10,
        fontSize: 18

    },
    buttonRow: {
        width: '100%',
        paddingHorizontal: 15
        , flexDirection: 'row',
        // alignContent: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    buttonContainer: {
        // flex: 1
    }
});

export default TaskDetailScreen