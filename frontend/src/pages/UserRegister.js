import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // TODO: Replace with real API call
    // Simulate registration success
    navigate('/login');
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', background: 'linear-gradient(120deg, #e3f0fc 0%, #f8fbff 100%)'}}>
      <div className="glass-card p-5" style={{maxWidth: 420, width: '100%', borderRadius: 24, boxShadow: '0 8px 32px rgba(25,118,210,0.10)'}}>
        <h2 className="fw-bold mb-3 text-center" style={{color: '#1976d2'}}>User Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required />
          </div>
          {error && <div className="alert alert-danger py-2 mb-3" style={{fontSize: '0.97rem', whiteSpace: 'pre-line'}}>{error}</div>}
          <button type="submit" className="btn btn-primary w-100 fw-bold" style={{background: 'linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)', border: 'none', borderRadius: 12}}>Register</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? <Link to="/login" style={{color: '#1976d2', fontWeight: 600}}>Login</Link></span>
        </div>
      </div>
      <style>{`.glass-card { background: rgba(255,255,255,0.85); backdrop-filter: blur(8px); }`}</style>
    </div>
  );
};

export default UserRegister; 