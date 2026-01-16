import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../store/slices/authSlice';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Имитация регистрации
    const mockUser = {
      id: 2,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      avatar: null
    };
    
    dispatch(signup({ user: mockUser, token: 'mock-jwt-token' }));
    navigate('/');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-side">
          <div className="signup-header">
            <Link to="/" className="back-link">← Back</Link>
            <h1 className="signup-title">Sign up</h1>
            <p className="signup-subtitle">Let’s get you all set up so you can begin booking your next trip.</p>
          </div>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="John" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Doe" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john.doe@gmail.com" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 234 567 890" 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="••••••••" 
                required 
              />
            </div>
            
            <label className="checkbox-label term-label">
              <input type="checkbox" required /> 
              <span className="checkmark"></span>
              I agree to all the <a href="#">Terms</a> and <a href="#">Privacy Policies</a>
            </label>
            
            <button type="submit" className="signup-btn">Create account</button>
            
            <p className="login-prompt">
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <div className="social-signup">
              <div className="divider"><span>Or sign up with</span></div>
              <div className="social-btns">
                <button type="button" className="social-btn">f</button>
                <button type="button" className="social-btn">G</button>
                <button type="button" className="social-btn">A</button>
              </div>
            </div>
          </form>
        </div>
        <div className="signup-image-side"></div>
      </div>
    </div>
  );
};

export default Signup;
