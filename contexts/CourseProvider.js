// contexts/CourseProvider.js
import React, { useState, useEffect } from 'react';
import CourseContext from './CourseContext';
import { fetchCourses } from '../services/WPService'; // You'll need to create this function

const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const courseData = await fetchCourses();
        setCourses(courseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;