import { useEffect, useState } from "react";

const SchoolCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");


  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  const filteredCourses = sortedCourses.filter(course =>
    course.courseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input 
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("trimester")}>Trimester</th>
          <th onClick={() => handleSort("courseNumber")}>Course Number</th>
          <th onClick={() => handleSort("courseName")}>Course Name</th>
          <th onClick={() => handleSort("credits")}>Semester Credits</th>
          <th onClick={() => handleSort("clockHours")}>Total Clock Hours</th>
          <th>Enroll</th>
        </tr>
      </thead>
        <tbody>
          {sortedCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.credits}</td>
              <td>{course.clockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default SchoolCatalog;
