import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    // TODO: Replace with real API call
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      return;
    }
    // Simulate login success
    if (email === 'user@example.com' && password === 'password') {
      navigate('/');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', background: 'linear-gradient(120deg, #e3f0fc 0%, #f8fbff 100%)'}}>
      <div className="glass-card p-5" style={{maxWidth: 400, width: '100%', borderRadius: 24, boxShadow: '0 8px 32px rgba(25,118,210,0.10)'}}>
        <h2 className="fw-bold mb-3 text-center" style={{color: '#1976d2'}}>User Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          {error && <div className="alert alert-danger py-2 mb-3" style={{fontSize: '0.97rem', whiteSpace: 'pre-line', color: 'black !important'}}>{error}</div>}
          <button type="submit" className="btn btn-primary w-100 fw-bold" style={{background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)', border: 'none', borderRadius: 12}}>Login</button>
        </form>
        <div className="text-center mt-3">
          <span>New user? <Link to="/register" style={{color: '#1976d2', fontWeight: 600}}>Register</Link></span>
        </div>
      </div>
      <style>{`.glass-card { background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); }`}</style>
    </div>
  );
};

export default UserLogin; 