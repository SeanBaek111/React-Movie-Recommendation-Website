import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors({});
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    const validationErrors = {};

    if (!username) {
      validationErrors.username = 'Please enter your username';
    }

    if (!password) {
      validationErrors.password = 'Please enter your password';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert('login successful');
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <h1>Login</h1> 
      <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} className={errors.username ? 'form-control is-invalid' : 'form-control'} />
          <div className="invalid-feedback">{errors.username}</div>
        </label>
      </div>
       
      <div className="form-group">
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className={errors.password ? 'form-control is-invalid' : 'form-control'} />
          <div className="invalid-feedback">{errors.password}</div>
        </label>
      </div>
      
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </div>
  );
}

export default Login;
