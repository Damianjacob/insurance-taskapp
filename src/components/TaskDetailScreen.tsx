import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Task, TaskDetailProps } from '../../App';
import GenericButton from './GenericButton';



const TaskDetailScreen: FC<TaskDetailProps> = ({ navigation, route }) => {
    // console.log(route.params)
    const taskArray = route.params.tasks
    const taskIndex = route.params.taskIndex
    const task = taskArray[taskIndex]
    // const currentTaskIndex = route.params.currentTaskIndex
    // const task = tasks[currentTaskIndex]

    const skipTask = () => {
        navigation.navigate('TaskDetail', { tasks: taskArray, taskIndex: taskIndex + 1 })
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>task status: {task.status}</Text>
            <View style={styles.taskCard}>
                <Text style={[styles.label, { color: 'blue' }]}>Insured Person</Text>
                <Text style={[styles.value, { color: 'blue' }]}>{task.name}</Text>
                <Text style={styles.label}>Contract Number</Text>
                <Text style={styles.value}>{task.contractNumber}</Text>
                <View style={styles.columnContainer}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>{task.gender}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Birthdate</Text>
                        <Text style={styles.value}>{task.birthdate}</Text>
                    </View>

                </View>
                <View>
                    <Text style={styles.label}>Phone Number</Text>
                    <Text style={styles.value}>{task.phone}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.value}>{task.address}</Text>
                </View>
            </View>

            <View style={styles.buttonRow}>
                <GenericButton
                    text='Escalate'
                    onPress={() => { }}
                />
                <GenericButton
                    text='Skip'
                    onPress={skipTask}
                />
                <GenericButton
                    text='Save'
                    onPress={() => { }}
                />
            </View>
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
        justifyContent: 'space-between'
    },
    buttonContainer: {
        // flex: 1
    }
});

export default TaskDetailScreen