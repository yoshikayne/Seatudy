import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'

const Course = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = localStorage.getItem("user");
        const res = await axios.get(`http://localhost:8800/my-course/?user=${user}`);
        setCourses(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchCourses()
  }, []);

  const handleDelete = async (courseId) => {
    try{
      const user = localStorage.getItem("user");
      await axios.delete(`http://localhost:8800/my-course/${courseId}?user=${user}`);
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Navbar />
      <h1>My Course</h1>
      <div className="courses">
        {courses.map(course => (
          <div key={course.courseId} className="course">
            {course.cover && <img src={course.cover} alt="Course" />}
            <h2>{course.title}</h2>
            <p>{course.desc}</p>
            <span>{course.price}</span>
            <button className="del-course-btn" onClick={()=>handleDelete(course.courseId)}>Delete Course</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course