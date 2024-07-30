import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { authActions } from '../store/auth';
import './/Login.css';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import { isTokenValid } from '../utils/auth';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (isTokenValid(token)) {
            navigate('/');
        }
    }, [navigate]);

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data.success) {
                dispatch(authActions.login({ user: username }));
                localStorage.setItem("token", data.token);
                alert('Login successful');
                navigate('/');
            } else {
                alert(data.error);
            }
        },
        onError: (error) => {
            console.error("Error during login:", error);
            alert('Login failed');
        }
    })

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(username);
    };

    return (
        <div className='login-container'>
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
