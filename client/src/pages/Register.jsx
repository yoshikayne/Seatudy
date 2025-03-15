import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pwEnabled from '../assets/pwEnabled.svg';
import pwHidden from '../assets/pwHidden.svg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleRepassword = () => {
    setShowRepassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8800/register", 
        {
          username,
          password,
        });
        console.log(res.data);
        alert("User already exists.");
        navigate("/login");
    } catch(err) {
      console.error("Registration failed: ", err.response?.data || err.message);
      alert("Registration failed: " + err.response?.data || err.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <h1>Registration</h1>
        <p>Please fill in this form to create an account.</p>
        <br /><hr /><br />
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Enter Username" 
            name="username" 
            id="username" 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="pw-wrap">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              id="password" 
              required
              minLength="8" 
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img 
              src={showPassword ? pwHidden : pwEnabled} 
              alt="Toggle Password Visibility" 
              id="eyeicon"
              onClick={togglePassword}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="pw-wrap">
            <input 
              type={showRepassword ? "text" : "password"} 
              name="repassword" 
              id="repassword" 
              required 
              minLength="8" 
              placeholder="Repeat Password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <img 
              src={showRepassword ? pwHidden : pwEnabled} 
              alt="Toggle Password Visibility" 
              id="eyeicon2"
              onClick={toggleRepassword}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <br /><hr /><br />
        <p>By creating an account you agree to our <u>Terms & Privacy</u>.</p>
        <br />
        <button type="submit" name="register" className="button">Register</button>
      </form>
    </div>
  );
};

export default Register;