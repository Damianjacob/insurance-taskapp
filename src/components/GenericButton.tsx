import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type GenericButtonProps = {
    text: string,
    color?: string,
    backgroundColor?: string,
    onPress: () => void
}

const GenericButton: FC<GenericButtonProps> = ({ text, color, backgroundColor, onPress }) => {
    color = color || 'white'
    backgroundColor = backgroundColor || 'blue'

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
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