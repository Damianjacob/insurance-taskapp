import { StatusBar } from 'expo-status-bar';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Task, TaskListProps } from '../../App';
const taskData:Task[] = require('../../tasks.json')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// type TaskListScreenNavigationProp = NativeStackNavigationProp<
//     'TaskListScreen'
// >;
const TaskListScreen: FC<TaskListProps> = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>this is the tasklistscreen</Text>
            <FlatList
                style={styles.taskList}
                data={taskData}
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.listHeaderContainer}>
                            <Text style={styles.listHeader}>Contract Number</Text>
                            <Text style={styles.listHeader}>Status</Text>
                        </View>
                    )
                }}
                stickyHeaderIndices={[0]}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TaskDetail', {task: item})}>
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemContractNumber}>{item.contractNumber
                                }</Text>
                                <Text>{item.status
                                }</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
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
    }
});

export default TaskListScreen