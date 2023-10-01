import React, { useRef } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export default function CourseDescriptionModal({ course, onClose }) {
    function stripHtmlTags(str) {
        if (!str || typeof str !== 'string') return '';
        str = str.replace(/<\/?[^>]+(>|$)/g, "");
        return str.replace("&#8217;", "'");
    }

    let featuredImageUrl = null;
    if (course._embedded && course._embedded['wp:featuredmedia'] && course._embedded['wp:featuredmedia'][0] && course._embedded['wp:featuredmedia'][0].source_url) {
        featuredImageUrl = course._embedded['wp:featuredmedia'][0].source_url;
    }

    const translateY = useRef(new Animated.Value(0)).current;

    const handleGestureEvent = Animated.event([
        {
            nativeEvent: {
                translationY: translateY,
            },
        },
    ], { useNativeDriver: false });

    const handleStateChange = ({ nativeEvent }) => {
        if (nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: false,
            }).start();

            // Close the modal if the swipe down threshold is reached
            if (nativeEvent.translationY > 100) {
                onClose();
            }
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!course}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <PanGestureHandler
                    onGestureEvent={handleGestureEvent}
                    onHandlerStateChange={handleStateChange}
                >
                    <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
                        <View style={styles.imageContainer}>
                            {featuredImageUrl && <Image source={{ uri: featuredImageUrl }} style={styles.image} />}
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.4)']}
                                style={styles.gradient}
                            >
                                <Text style={styles.title}>{course.title.rendered}</Text>
                            </LinearGradient>
                        </View>
                        <Text>{stripHtmlTags(course.content.rendered)}</Text>
                        <TouchableOpacity onPress={onClose} style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </PanGestureHandler>
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
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    imageContainer: {
        position: 'relative'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 15
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
    }
});
