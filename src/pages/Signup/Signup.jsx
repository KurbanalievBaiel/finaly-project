import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../store/slices/authSlice';
import { authAPI } from '../../api/api';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };
      
      const response = await authAPI.signup(userData);
      
      if (response.success) {
        const user = response.data;
        dispatch(signup({ user, token: user.token }));
        navigate('/');
      } else {
        setError(response.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="John" 
                  required 
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 234 567 890" 
                  disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            
            <label className="checkbox-label term-label">
              <input type="checkbox" required disabled={loading} /> 
              <span className="checkmark"></span>
              I agree to all the <a href="#">Terms</a> and <a href="#">Privacy Policies</a>
            </label>
            
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
            
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
