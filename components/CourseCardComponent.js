import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default CourseCardComponent = ({ course, onPress }) => {
    // Extract the featured image URL; set a default or fallback if needed
    let featuredImageUrl = null;
    if (course._embedded && course._embedded['wp:featuredmedia'] && course._embedded['wp:featuredmedia'][0] && course._embedded['wp:featuredmedia'][0].source_url) {
        featuredImageUrl = course._embedded['wp:featuredmedia'][0].source_url;
    }

    return(
        <TouchableOpacity onPress={() => onPress(course)}>
            <View>
                {featuredImageUrl && <Image source={{ uri: featuredImageUrl }} style={{ width: 100, height: 100 }} />}
                <Text>{course.title.rendered}</Text>
            </View>
        </TouchableOpacity>
    );
};
