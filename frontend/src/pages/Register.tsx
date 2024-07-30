import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { authActions } from "../store/auth";

const Register: React.FC = () => {
    const [username, setUsername] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            if (data.success) {
                dispatch(authActions.login({ user: username }));
                localStorage.setItem("token", data.token);
                alert('Registration successful');
                navigate('/login');
            } else {
                alert(data.error);
            }
        },
        onError: (error) => {
            console.error("Error during registration:", error);
            alert('Registration failed');
        },
    })

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(username);
    };

    return (
        <>
            <div className='login-container'>
                <div className="login-form">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;