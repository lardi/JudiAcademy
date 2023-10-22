import React from 'react';
import { Text } from 'react-native';
import useIsEnrolled from '../../hooks/useIsEnrolled';

export default EnrollButton = ({courseId}) => {
  const isEnrolled = useIsEnrolled(courseId);

  return (
    <Text>
      {isEnrolled ? "You are enrolled in this course!" : "You are not enrolled in this course."}
    </Text>
  );
}