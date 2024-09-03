import logo from "./assets/logo.png";
import React, { useContext } from 'react';
import { CourseContext } from './CourseContext';


export default function Header() {
  const { enrolledCourses } = useContext(CourseContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">
      <p>Classes Enrolled: {enrolledCourses.length}</p>
      </div>
    </div>
  );
}
