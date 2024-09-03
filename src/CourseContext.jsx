import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    const isAlreadyEnrolled = enrolledCourses.some(enrolledCourse => enrolledCourse.courseNumber === course.courseNumber);
    if (!isAlreadyEnrolled) {
      setEnrolledCourses([...enrolledCourses, course]);
    } else {
      console.log("Course is already enrolled");
    }
  };
  

  const dropCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.courseNumber !== courseId));
  };

  return (
    <CourseContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
