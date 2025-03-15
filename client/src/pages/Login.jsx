import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pwEnabled from '../assets/pwEnabled.svg';
import pwHidden from '../assets/pwHidden.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/login", 
      {
        username,
        password,
      });
      console.log(res.data, { username, password });
      alert("Login successful.");
      localStorage.setItem("user", username);
      navigate("/dashboard");
    } catch(err) {
      console.error("Login Failed: ", err.response?.data || err.message);
      alert("Login Failed: " + err.response?.data || err.message);
    };
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <h1>Login</h1>
        <p>Please fill in your account information.</p>
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
        <br /><hr /><br />
        <input type="submit" value="Login" name="login" className="button" />
      </form>
    </div>
  );
};

export default Login;