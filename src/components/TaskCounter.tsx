import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TaskContext } from '../../App';
import { useContext } from 'react';
import Svg, { Circle } from 'react-native-svg'
import Animated from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TASKGOAL = 200

const circleCircumference = 400
const circleDiameter = circleCircumference / (2 * Math.PI)

export default function TaskCounter() {
    const taskContext = useContext(TaskContext)
    const currentTime = Date.now()

    const completedTasks = taskContext.taskArray.filter(task => task.status === 'done')
    const numberCompletedTasks = completedTasks.length
    const tasksCompletedInLastHour = completedTasks.filter(task => task.completionTime !== undefined && currentTime - task.completionTime < 60 * 60 * 1000)
    const taskPercentage = numberCompletedTasks / TASKGOAL
    console.log(taskPercentage)
    const strokeDashoffset = numberCompletedTasks === 0 ? circleCircumference : circleCircumference * (1 - taskPercentage)
    console.log('strokedashoffset: ' + strokeDashoffset)
    return (
        <View style={styles.container}>
            <Svg height={windowWidth * 0.4} width={windowWidth * 0.4}>
                <Circle
                    cx={windowWidth * 0.4 / 2}
                    cy={windowWidth * 0.4 / 2}
                    r={circleDiameter}
                    stroke={'gray'}
                    strokeWidth={15}
                    fill={'white'}
                />

                <Circle
                    cx={windowWidth * 0.4 / 2}
                    cy={windowWidth * 0.4 / 2}
                    r={circleDiameter}
                    stroke={'blue'}
                    strokeWidth={15}
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    // strokeDashoffset={numberCompletedTasks === 0 ? circleCircumference : circleCircumference * taskPercentage}
                    fill={'white'}
                />
            </Svg>
            <Text>Number of tasks completed in last hour: {tasksCompletedInLastHour.length}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
