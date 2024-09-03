import React, { createContext, useState } from 'react';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    console.log("Enrolling course:", course);
    setEnrolledCourses([...enrolledCourses, course]);
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
