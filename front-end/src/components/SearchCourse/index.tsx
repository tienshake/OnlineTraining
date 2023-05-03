import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchCourse = () => {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/courses/search?keyword=${keyword}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {/* {courses.map((course) => (
          <div key={course.id}>
            <img src={course.thumbnail} alt={course.title} />
            <h3>{course.title}</h3>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default SearchCourse;
