import { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, TextInput, Dimensions, ScrollView } from 'react-native';
import { TaskDetailProps } from '../utils/types';
import GenericButton from '../components/buttons/GenericButton';
import { TaskContext } from '../../App';
import TaskCounter from '../components/TaskCounter';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TaskDetailScreen: FC<TaskDetailProps> = ({ navigation, route }) => {
    const [userInput, setUserInput] = useState<string>('')
    const [inputErrorMessage, setInputErrorMessage] = useState<string>('')
    const taskContext = useContext(TaskContext)
    // const updateTaskArray = taskContext.updateTaskArray
    const updateTask = taskContext.updateTask
    // const taskArray = route.params.tasks
    const filterBy = route.params.filterBy
    // Define the task array based on whether there was a filter for the status
    const taskArray = filterBy ? taskContext.taskArray.filter(task => task.status === filterBy) : taskContext.taskArray
    const taskIndex = route.params.taskIndex
    const currentTask = taskArray[taskIndex]

    console.log('currentTask:')
    console.log(currentTask)
    const skipTask = () => {
        if (taskArray.length > taskIndex) {
            navigation.navigate('TaskDetail', { tasks: taskArray, taskIndex: taskIndex + 1, filterBy })
        } else {
            Alert.alert('There are no new tasks')
        }
        setUserInput('')
    }

    const markTaskAsDone = () => {
        const updatedTask = {
            ...currentTask,
            status: 'done',
            completionTime: Date.now()
        }
        if (updateTask) {
            updateTask(updatedTask)
        } else {
            console.error('updateTask is undefined')
        }
        setUserInput('')
    }

    const escalateTask = () => {
        const updatedTask = {
            ...currentTask,
            status: 'escalated'
        }
        if (updateTask) {
            updateTask(updatedTask)
        } else {
            console.error('updateTask is undefined')
        }
        setUserInput('')
    }

    const updateMissingInfo = () => {
        const valid = validateInput(userInput)
        console.log('userinput: ' + userInput)

        if (valid) {
            const updatedTask = {
                ...currentTask,
                birthdate: userInput
            }

            console.log('updated task: ')
            console.log(updatedTask)
            if (updateTask) {
                updateTask(updatedTask)
            } else {
                console.error('updateTask is undefined')
            }
        }
    }

    type InputValidator = (input: string) => boolean
    const validateInput: InputValidator = (input: string) => {
        const datePattern = /^\d{2}\.\d{2}\.\d{4}$/
        if (!input) {
            setInputErrorMessage('Input cannot be empty')
            return false
        } else if (!input.match(datePattern)) {
            setInputErrorMessage('The format has to be dd.mm.yyyy')
            return false
        }
        setInputErrorMessage('')
        return true
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}
                contentContainerStyle={{ alignItems: 'center' }}>
                {currentTask ?
                    <>
                        <TaskCounter />
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
                                    <Text style={styles.value}>{currentTask.birthdate ? currentTask.birthdate : ''}</Text>
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

                        <View style={styles.userInputContainer}>
                            <Text style={styles.userInputLabel}>Insert missing information: birthdate</Text>
                            <TextInput
                                style={styles.userInput}
                                placeholder='birthdate'
                                onChangeText={(text) => { setUserInput(text) }}
                                value={userInput}
                                keyboardType='numeric'
                            />
                            <Text style={styles.inputErrorMessage}>{inputErrorMessage}</Text>
                            <View style={styles.buttonContainer}>
                                <GenericButton
                                    onPress={updateMissingInfo}
                                    text='Save'
                                    disable={currentTask.status !== 'new'}
                                />
                            </View>
                        </View>

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

                    </>
                    :
                    <Text style={styles.noTaskMessage}>{
                        filterBy ?
                            `You don't have any more tasks marked as ${filterBy}`
                            :
                            "You don't have any tasks"

                    }</Text>
                }
                <GenericButton
                    text='Back to Task Overview'
                    onPress={() => { navigation.navigate('Home') }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        width: '90%',
        marginVertical: 20,
        padding: 10,
    },
    columnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    column: {
        width: '50%'
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
        paddingHorizontal: 15,
        flexDirection: 'row',
        // alignContent: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 5,
    },
    noTaskMessage: {
        fontSize: 20,
        marginVertical: 30,
        marginHorizontal: 10
    },
    userInputContainer: {
        marginVertical: 20,
        width: '90%',
        borderRadius: 5,
        borderColor: 'lightgray',
        borderWidth: 1,
        padding: 15
    },
    userInputLabel: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5
    },
    userInput: {
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    inputErrorMessage: {
        color: 'red',
        textAlign: 'center'
    }
});

export default TaskDetailScreen