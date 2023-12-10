import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TaskContext } from '../../App';
import { useContext } from 'react';
import Svg, { Circle } from 'react-native-svg'
import Animated from 'react-native-reanimated';
import PieChart from 'react-native-pie-chart'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TASKGOAL = 200

const circleCircumference = windowWidth < windowHeight ? windowWidth : windowHeight / 2
const circleDiameter = circleCircumference / (2 * Math.PI)

export default function TaskPieChart() {
    const taskContext = useContext(TaskContext)
    const numberCompletedTasks: number = taskContext.taskArray.filter(task => task.status === 'done').length
    const numberNewTasks: number = taskContext.taskArray.filter(task => task.status === 'new').length
    const numberEscalatedTasks: number = taskContext.taskArray.filter(task => task.status === 'escalated').length
    const series: number[] = [numberNewTasks, numberCompletedTasks, numberEscalatedTasks]
    const colors: string[] = ['lightgray', 'green', 'orange']

    const totalTasks: number = numberCompletedTasks + numberEscalatedTasks + numberNewTasks
    const percentageNewTasks: number = numberNewTasks / totalTasks * 100
    const percentageEscalatedTasks: number = numberEscalatedTasks / totalTasks * 100
    const percentageCompletedTasks: number = numberCompletedTasks / totalTasks * 100

    return (
        <View style={styles.container}>
            {totalTasks === 0 ?
                <Text>Loading</Text>
                :
                <PieChart
                    widthAndHeight={circleCircumference * 0.2}
                    series={series}
                    sliceColor={colors}
                />
            }
            <View style={styles.colorRowContainer}>
                <View style={styles.colorRow}>
                    <View style={[styles.colorSquare, { backgroundColor: 'lightgray' }]}></View>
                    <Text style={styles.colorExplanationText}>New ({Math.round(percentageNewTasks)}%)</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorSquare, { backgroundColor: 'orange' }]}></View>
                    <Text style={styles.colorExplanationText}>Escalated ({Math.round(percentageEscalatedTasks)}%)</Text>
                </View>
                <View style={styles.colorRow}>
                    <View style={[styles.colorSquare, { backgroundColor: 'green' }]}></View>
                    <Text style={styles.colorExplanationText}>Done ({Math.round(percentageCompletedTasks)}%)</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'slategray',
        borderWidth: 1,
        margin: 5
    },
    counterText: {
        width: circleDiameter * 1.5,
        textAlign: 'center'
    },
    counterNumber: {
        width: circleDiameter * 1.5,
        textAlign: 'center',
        fontSize: 16,
        color: 'blue',
        fontWeight: '600'
    },
    colorRowContainer: {
        alignItems: 'flex-start',
        // flex: 1,
        marginTop: 5
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    colorSquare: {
        height: 10,
        width: 10,
        marginRight: 5
    },
    colorExplanationText: {

    },
    // piechart: {
    //     flex: 1
    // }
});
