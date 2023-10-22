import React, { useState , useContext } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CourseContext from '../contexts/CourseContext';
import CourseCardComponent from '../components/CourseCardComponent';
import CourseDescriptionModal from './modals/CourseDescriptionModal';
import cat from '../constants/courseCategories';
import tags from '../constants/courseTags';



export default CoursesListComponent = () => {
    const { courses, loading } = useContext(CourseContext);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);  // Store the selected course

    if (loading) {
        return <Text>Loading courses...</Text>;
    }    

    // Function to get parent tag for a given course
    const getParentTag = (course) => {
        const courseTags = course.ld_course_tag;
        for (let tagId of courseTags) {
            if (tags.parent[tagId]) {
                return tagId; // Return the first parent tag ID found
            }
        }
        return null;
    };

    // Nested grouping: first by category and then by parent tag
    const groupedByCategoryAndTag = courses.reduce((grouped, course) => {
        const category = course.ld_course_category[0];
        const parentTagId = getParentTag(course);
        
        if (!grouped[category]) {
            grouped[category] = {};
        }
        if (parentTagId) {
            (grouped[category][parentTagId] = grouped[category][parentTagId] || []).push(course);
        }
        return grouped;
    }, {});

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                {Object.keys(groupedByCategoryAndTag).map(category => (
                    <View key={category} style={{ marginBottom: 20 }}>
                        {/* This is the category header */}
                        <Text style={styles.categoryHeader}>{cat[category] || category}</Text>
    
                        {/* Render each tag and its courses within this category */}
                        {Object.keys(groupedByCategoryAndTag[category]).map(tagId => (
                            <View style={{flex: 1, marginTop: 10}} key={tagId}>
                                <Text style={styles.section}>{tags.parent[tagId]}</Text>
                                <FlatList
                                    horizontal={true}
                                    data={groupedByCategoryAndTag[category][tagId]}
                                    keyExtractor={course => course.id.toString()}
                                    renderItem={({ item }) => (
                                        <CourseCardComponent 
                                            course={item} 
                                            onPress={selected => setSelectedCourse(selected)} 
                                        />
                                    )}
                                />
                            </View>
                        ))}
                    </View>
                ))}
    
                {selectedCourse && (
                    <CourseDescriptionModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryHeader: {
        fontSize: 22,
        backgroundColor: '#049f82',
        color: '#fff',
        padding: 15
    },
    section: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 15
    }
})