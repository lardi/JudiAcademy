// hooks/useIsEnrolled.js

import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const useIsEnrolled = (courseID) => {
  const { userData } = useContext(UserContext);

  // Check if 'userEnrolledCourses' field in userData contains the given courseID
  const isEnrolled = userData?.userEnrolledCourses?.includes(courseID);
  return isEnrolled;
};

export default useIsEnrolled;
