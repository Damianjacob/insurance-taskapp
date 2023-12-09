import { StatusBar } from 'expo-status-bar';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Button, Alert } from 'react-native';
import { Task, TaskListProps } from '../../App';
import GenericButton from './GenericButton';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TaskListScreen: FC<TaskListProps> = ({ navigation, route }) => {
    const [taskArray, setTaskArray] = useState<Task[]>([])
    const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0)
    const newTasks: Task[] = taskArray.filter(task => task.status === 'new')

    useEffect(() => {
        // get tasks from file and set them as state when the app starts
        const taskData: Task[] = require('../../tasks.json')
        setTaskArray(taskData)
    }, [])

    // useEffect(() => {
    //     navigation.navigate('TaskDetail', {task: newTasks[currentTaskIndex], skipTask: skipTask})
    // }, [currentTaskIndex])

    const startTaskList = () => {
        // create array that contains only new tasks
        if (newTasks.length > 0) {
            navigation.navigate('TaskDetail', { tasks: newTasks, taskIndex: 0 })
        } else {
            Alert.alert('There are no new tasks')
        }
    }

    // const skipTask = () => {
    //     console.log('calling skiptask')
    //     setCurrentTaskIndex(prev => {
    //         let newState = prev + 1
    //         navigation.navigate('TaskDetail', {task: newTasks[newState], skipTask: skipTask})
    //         return newState
    //     })
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>this is the tasklistscreen</Text>
            <FlatList
                style={styles.taskList}
                data={taskArray}
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.listHeaderContainer}>
                            <Text style={styles.listHeader}>Contract Number</Text>
                            <Text style={styles.listHeader}>Status</Text>
                        </View>
                    )
                }}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TaskDetail', { tasks: taskArray, taskIndex: index})}>
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemContractNumber}>{item.contractNumber}</Text>
                                <Text>{item.status}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={styles.buttonContainer}>
                <GenericButton
                    text='Start'
                    onPress={startTaskList}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 40,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //   justifyContent: 'center',
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        // marginTop: 30
    },
    itemContainer: {
        flexDirection: 'row',
        // alignContent: 'space-between'
        justifyContent: 'space-between',
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E3ECF7',
        borderRadius: 10
    },
    taskList: {
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 20,
        // height: windowHeight > windowWidth? windowHeight * 0.7 : windowWidth * 0.7
        height: windowHeight * 0.5,
        flexGrow: 0
    },
    itemContractNumber: {

    },
    listHeaderContainer: {
        flexDirection: 'row',
        // alignContent: 'space-between'
        justifyContent: 'space-between',
        paddingVertical: 8,
        backgroundColor: 'white'

    },
    listHeader: {
        fontSize: 18,
        fontWeight: '500'
    },
    buttonContainer: {
        marginVertical: 10
    }
});

export default TaskListScreen