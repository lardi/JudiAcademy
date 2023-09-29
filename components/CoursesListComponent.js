import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { fetchCourses } from '../services/WPService';
import CourseCardComponent from '../components/CourseCardComponent';


export default CoursesListComponent = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);  // Store the selected course

    useEffect(() => {
        const getCourses = async () => {
            try {
                const coursesData = await fetchCourses();
                setCourses(coursesData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getCourses();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    function stripHtmlTags(str) {
        if (!str || typeof str !== 'string') return '';
    
        // Remove HTML tags
        str = str.replace(/<\/?[^>]+(>|$)/g, "");
        return str.replace("&#8217;", "'");
    }

    return (
        <View>
            <FlatList
                data={courses}
                keyExtractor={course => course.id.toString()}
                renderItem={({ item }) => (
                    <CourseCardComponent 
                        course={item} 
                        onPress={selected => setSelectedCourse(selected)} 
                    />
                )}
            />
                        {selectedCourse && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedCourse}
                    onRequestClose={() => {
                        setSelectedCourse(null);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                            <Text>{selectedCourse.title.rendered}</Text>
                            <Text>{stripHtmlTags(selectedCourse.content.rendered)}</Text>
                            <TouchableOpacity onPress={() => setSelectedCourse(null)} style={{ alignSelf: 'center', marginTop: 20 }}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}
