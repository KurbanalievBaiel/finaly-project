import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    password: 'password123'
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Имитация успешного входа
    const mockUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: formData.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    };
    
    dispatch(login({ user: mockUser, token: 'mock-jwt-token' }));
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-side">
          <div className="login-header">
            <Link to="/" className="back-link">← Back</Link>
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">Login to access your Golobe account</p>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
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
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••" 
                required 
              />
            </div>
            
            <div className="form-footer">
              <label className="checkbox-label">
                <input type="checkbox" /> 
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password</a>
            </div>
            
            <button type="submit" className="login-btn">Login</button>
            
            <p className="signup-prompt">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>

            <div className="social-login">
              <div className="divider"><span>Or login with</span></div>
              <div className="social-btns">
                <button type="button" className="social-btn">f</button>
                <button type="button" className="social-btn">G</button>
                <button type="button" className="social-btn">A</button>
              </div>
            </div>
          </form>
        </div>
        <div className="login-image-side">
          {/* Можно добавить промо-картинку или слайдер */}
        </div>
      </div>
    </div>
  );
};

export default Login;
