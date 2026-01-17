import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import { authAPI } from '../../api/api';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    password: 'password123'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authAPI.login(formData.email, formData.password);
      
      if (response.success) {
        const userData = response.data;
        dispatch(login({ user: userData, token: userData.token }));
        navigate('/');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john.doe@gmail.com" 
                required 
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            
            <div className="form-footer">
              <label className="checkbox-label">
                <input type="checkbox" disabled={loading} /> 
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password</a>
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
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
