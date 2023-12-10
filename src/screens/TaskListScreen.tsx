import React, { FC, useContext, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { TaskListProps } from '../utils/types';
import { Task } from '../utils/types';
import GenericButton from '../components/buttons/GenericButton';
import { TaskContext } from '../../App';
import TaskCounter from '../components/TaskCounter';
import TaskPieChart from '../components/TaskPieChart';
import Ionicons from '@expo/vector-icons/Ionicons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TaskListScreen: FC<TaskListProps> = ({ navigation, route }) => {
    const taskContext = useContext(TaskContext)
    const taskArray = taskContext.taskArray
    const [filter, setFilter] = useState<"new" | "done" | "escalated" | undefined>(undefined)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const newTasks: Task[] = taskArray.filter(task => task.status === 'new')

    const startTaskList = () => {
        if (newTasks.length > 0) {
            navigation.navigate('TaskDetail', { tasks: newTasks, taskIndex: 0, filterBy: filter })
        } else {
            Alert.alert('There are no new tasks')
        }
    }


    const renderItem = (item: Task, index: number) => {
        if (filter && filter !== item.status) {
            return <></>
        }

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('TaskDetail', { tasks: taskArray, taskIndex: index })}>
                <View style={styles.itemContainer}>
                    <View style={styles.iconRow}>
                        <Ionicons
                            name='document'
                            size={16}
                            style={styles.icon} />
                        <Text style={styles.itemContractNumber}>{item.contractNumber}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Text>{item.status}</Text>
                        <Ionicons
                            name={item.status === 'done' ? 'checkmark' : item.status === 'escalated' ? 'arrow-up' : 'pencil'}
                            size={16}
                            style={styles.icon} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.chartRow}>
                <TaskCounter />
                <TaskPieChart />
                {/* <TaskCounter /> */}
            </View>
            <View style={styles.listSection}>

                <Text style={styles.header}>Your Tasks</Text>
                <FlatList
                    extraData={filter}
                    initialNumToRender={15}
                    style={styles.taskList}
                    data={taskArray}
                    ListHeaderComponent={() => {
                        return (
                            <View style={styles.listHeaderContainer}>
                                <Text style={styles.listHeader}>Contract Number</Text>
                                <View style={styles.iconRow}>
                                    <TouchableOpacity
                                        onPress={() => { setModalVisible(true) }}
                                    >
                                        <Ionicons
                                            name='filter'
                                            size={28}
                                            style={{ color: 'blue', marginRight: 5 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.listHeader}>Status</Text>

                                </View>
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
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Select one filter</Text>
                        <Pressable
                            style={[styles.filterOptionsButton, { backgroundColor: !filter ? 'green' : 'white' }]}
                            onPress={() => setFilter(undefined)}>
                            <Text style={styles.filterOptionsText}>None</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterOptionsButton, { backgroundColor: filter === 'done' ? 'green' : 'white' }]}
                            onPress={() => setFilter('done')}>
                            <Text style={styles.filterOptionsText}>Done</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterOptionsButton, { backgroundColor: filter === 'new' ? 'green' : 'white' }]}
                            onPress={() => setFilter('new')}>
                            <Text style={styles.filterOptionsText}>New</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterOptionsButton, { backgroundColor: filter === 'escalated' ? 'green' : 'white' }]}
                            onPress={() => setFilter('escalated')}>
                            <Text style={styles.filterOptionsText}>Escalated</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    chartRow: {
        flexDirection: 'row',
        flex: 1
    },
    listSection: {
        flex: 3,
        width: '100%',
        paddingTop: 10
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#E3ECF7',
        borderRadius: 10
    },
    taskList: {
        // marginTop: 10,
        width: '100%',
        paddingHorizontal: 20,
        // height: windowHeight > windowWidth? windowHeight * 0.7 : windowWidth * 0.7
        // height: windowHeight * 0.5,
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
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    filterOptionsButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'slategray',
        marginVertical: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginTop: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    filterOptionsText: {
        textAlign: 'center',
        color: 'black'
    }

});

export default TaskListScreen