import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

        const handleLogin = (e) => {
            e.preventDefault();
            if (username === "admin" && password === "123") {
                localStorage.setItem('isLoggedIn', 'true'); 
                navigate('/shipment');
            } else {
                alert("Username atau Password salah!");
            }
        };

    return (
        <div 
            className="container-fluid vh-100 d-flex justify-content-center align-items-center" 
            style={{ 
                backgroundColor: "#f4f7f6",
                backgroundImage: "linear-gradient(135deg, #3c4362ff 0%, #222121ff 100%)" 
            }}
        >
            <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark">Realtime Dashboard System</h2>
                        <p className="text-muted">PT. Bahana Bhumiphala Persada</p>
                    </div>
 
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label fw-bold text-secondary">Username</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg bg-light" 
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ fontSize: '0.9rem' }}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold text-secondary">Password</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg bg-light" 
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ fontSize: '0.9rem' }}
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg w-100 shadow-sm fw-bold"
                            style={{ 
                                borderRadius: '10px', 
                                letterSpacing: '1px',
                                transition: '0.3s'
                            }}
                        >
                            LOGIN
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <small className="text-muted">© 2025 Realtime Dashboard PT BBP</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;