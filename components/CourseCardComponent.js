import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default CourseCardComponent = ({ course, onPress }) => {
    // Extract the featured image URL; set a default or fallback if needed
    let featuredImageUrl = null;
    if (course._embedded && course._embedded['wp:featuredmedia'] && course._embedded['wp:featuredmedia'][0] && course._embedded['wp:featuredmedia'][0].source_url) {
        featuredImageUrl = course._embedded['wp:featuredmedia'][0].source_url;
    }

    return(
        <TouchableOpacity onPress={() => onPress(course)}>
            <View style={styles.container}>
                {featuredImageUrl && <Image source={{ uri: featuredImageUrl }} style={styles.image} />}
                <View style={styles.details}>
                    <Text>{course.title.rendered}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    details: {
        width: 150,
        paddingHorizontal: 15
    },
    container: {
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
        flex: 1
    }
})
