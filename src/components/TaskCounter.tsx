import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TaskContext } from '../../App';
import { useContext } from 'react';
import Svg, { Circle } from 'react-native-svg'
import Animated from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TASKGOAL = 200

const circleCircumference = windowWidth < windowHeight ? windowWidth * 0.85 : windowHeight / 2
const circleDiameter = circleCircumference / (2 * Math.PI)

export default function TaskCounter() {
    const taskContext = useContext(TaskContext)
    const currentTime = Date.now()

    const completedTasks = taskContext.taskArray.filter(task => task.status === 'done')
    const numberCompletedTasks = completedTasks.length
    const tasksCompletedInLastHour = completedTasks.filter(task => task.completionTime !== undefined && currentTime - task.completionTime < 60 * 60 * 1000)
    const taskPercentage = numberCompletedTasks / TASKGOAL
    const strokeDashoffset = numberCompletedTasks === 0 ? circleCircumference : circleCircumference * (1 - taskPercentage)
    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>Tasks completed in the last hour</Text>
            <Text style={styles.counterNumber}>{tasksCompletedInLastHour.length}</Text>
            <Svg height={circleCircumference * 0.4} width={circleCircumference * 0.4} style={{ position: 'absolute' }}>
                <Circle
                    cx={circleCircumference * 0.2}
                    cy={circleCircumference * 0.2}
                    r={circleDiameter}
                    stroke={'lightgray'}
                    strokeWidth={10}
                    fill={'transparent'}
                />

                <Circle
                    cx={circleCircumference * 0.4 / 2}
                    cy={circleCircumference * 0.4 / 2}
                    r={circleDiameter}
                    stroke={'blue'}
                    strokeWidth={12}
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    fill={'transparent'}
                />
            </Svg>
            <Text style={styles.dailyGoalCounterText}>{TASKGOAL - numberCompletedTasks} missing to daily goal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
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
    dailyGoalCounterText: {
        position: 'absolute',
        bottom: 2
    }
});
