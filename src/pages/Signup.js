import React, { useState } from 'react';
import '../App.css';
import './Signup.css';
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [errors, setErrors] = useState({});
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // validation
    const errors = {};
    if (!username) {
      errors.username = 'Please enter a username.';
    }
    if (!email) {
      errors.email = 'Please enter an email.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      errors.password = 'Please enter a password.';
    } else if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    } 
    
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    alert('signup successful');
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);
  };

  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

 
  return (
    <div className="signup-container">
      <h1>Signup</h1>
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
          Email:
          <input type="email" value={email} onChange={handleEmailChange} className={errors.email ? 'form-control is-invalid' : 'form-control'} />
          <div className="invalid-feedback">{errors.email}</div>
        </label>
      </div>
      <div className="form-group">
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className={errors.password ? 'form-control is-invalid' : 'form-control'} />
          <div className="invalid-feedback">{errors.password}</div>
        </label>
      </div>
      <div className="form-group">
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} className={errors.confirmPassword ? 'form-control is-invalid' : 'form-control'} />
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Signup</button>
    </form>

    </div>
  );
}

export default Signup;
