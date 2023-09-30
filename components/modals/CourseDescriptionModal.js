import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

export default function CourseDescriptionModal({ course, onClose }) {

    function stripHtmlTags(str) {
        if (!str || typeof str !== 'string') return '';
        // Remove HTML tags
        str = str.replace(/<\/?[^>]+(>|$)/g, "");
        return str.replace("&#8217;", "'");
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!course}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text>{course.title.rendered}</Text>
                    <Text>{stripHtmlTags(course.content.rendered)}</Text>
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modal: {
        width: '100%',
        height: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    }
})