import React, { useState, useEffect } from'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/dashboard");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/dashboard">Seatudy</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Home</Link></li>
        <li>{user && <Link to="/my-course">My Course</Link>}</li>
        {user ? (
            <li>
                <div className="logged-in">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </li>
        ) : (
            <li>
                <Link to="/login">Login</Link>
            </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;