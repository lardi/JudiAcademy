import React from 'react';
import { View, TouchableOpacity, Text, ProgressBarAndroid, StyleSheet } from 'react-native';

function EnrollButton({ isEnrolled, progress, onEnroll }) {
    if (isEnrolled) {
        return (
            <View style={styles.progressBarContainer}>
                <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress} />
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={onEnroll} style={styles.enrollButton}>
            <Text>Roll</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    enrollButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'skyblue',
        borderRadius: 5,
        alignItems: 'center'
    },
    progressBarContainer: {
        marginTop: 10,
    }
});

export default EnrollButton;
