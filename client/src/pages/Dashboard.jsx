import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Dashboard = () => {
  const [courses, setCourses] = useState([])
  const [addedCourses, setAddedCourses] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/dashboard")
        setCourses(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchCourses()
  }, []);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const user = localStorage.getItem("user");
        const res = await axios.get(`http://localhost:8800/my-course?user=${user}`);
        const myCourses = new Set(res.data.map(course => course.courseId));
        setAddedCourses(myCourses);
      } catch(err) {
        console.log(err)
      }
    }
    fetchMyCourses()
  }, []);

  const handleAdd = async (course) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please log in to add courses.");
      navigate("/login");
      return;
    }
    try{
      await axios.post("http://localhost:8800/dashboard", {
        user,
        courseId: course.id,
        title: course.title,
        desc: course.cdesc,
        cover: course.cover,
        price: course.price,
      });
      setAddedCourses(prev => new Set(prev).add(course.id));
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <div className="courses">
          {courses.map(course => (
          <div key={course.id} className="course">
            {course.cover && <img src={course.cover} alt="Course" />}
            <h2>{course.title}</h2>
            <p>{course.cdesc}</p>
            <span>{course.price}</span>
            <button 
              className="add-course-btn" 
              onClick={() => handleAdd(course)}
              disabled={addedCourses.has(course.id)}>
              {addedCourses.has(course.id) ? "Course Added" : "Add Course"}
            </button>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard