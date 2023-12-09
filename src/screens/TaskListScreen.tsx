import { StatusBar } from 'expo-status-bar';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Button, Alert } from 'react-native';
import { TaskListProps } from '../utils/types';
import { Task } from '../utils/types';
import GenericButton from '../components/buttons/GenericButton';
import { TaskContext } from '../../App';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TaskListScreen: FC<TaskListProps> = ({ navigation, route }) => {
    // const [taskArray, setTaskArray] = useState<Task[]>([])
    const taskContext = useContext(TaskContext)
    const taskArray = taskContext.taskArray
    const updateTaskArray = taskContext.updateTaskArray
    // const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0)
    const newTasks: Task[] = taskArray.filter(task => task.status === 'new')

    const startTaskList = () => {
        // create array that contains only new tasks
        if (newTasks.length > 0) {
            navigation.navigate('TaskDetail', { tasks: newTasks, taskIndex: 0, filterBy: 'new' })
        } else {
            Alert.alert('There are no new tasks')
        }
    }

    const renderItem = (item: Task, index: number) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('TaskDetail', { tasks: taskArray, taskIndex: index })}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemContractNumber}>{item.contractNumber}</Text>
                    <Text>{item.status}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>this is the tasklistscreen</Text>
            <FlatList
                initialNumToRender={15}
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
                renderItem={({ item, index }) => renderItem(item, index)}
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