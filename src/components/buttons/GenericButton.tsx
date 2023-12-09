import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type GenericButtonProps = {
    text: string,
    color?: string,
    backgroundColor?: string,
    onPress: () => void,
    disable?: boolean
}

const GenericButton: FC<GenericButtonProps> = ({ text, color, backgroundColor, onPress, disable }) => {
    color = color || 'white'
    backgroundColor = backgroundColor || 'blue'

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disable}
        >
            <View style={[styles.container, { backgroundColor: disable ? 'gray' : backgroundColor }]}>
                <Text style={[styles.buttonText, { color: color }]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18
    }
}
)

export default GenericButton