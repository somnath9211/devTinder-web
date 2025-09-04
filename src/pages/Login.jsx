import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login attempted with', { emailId, password });

        try {
            const response = await axios.post(
                'http://localhost:7777/login',
                { emailId, password },
                { withCredentials: true }
            );

            dispatch(setUser(response.data.user));

            console.log('Login successful:', response);
            // Example: Save token if provided
            // localStorage.setItem("token", response.data.token);
            // Navigate user
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response.data.message || error.response.data);
            } else if (error.request) {
                console.error("No response from server:", error.request);
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    return (
        <div class="relative flex flex-col justify-center h-screen overflow-hidden">
            <div class="w-full p-6 m-auto bg-base-300 rounded-md shadow-md lg:max-w-lg">
                <h1 class="text-3xl font-semibold text-center text-purple-700">Login </h1>
                <form class="space-y-4">
                    <div>
                        <label class="label">
                            <span class="text-base label-text">Email</span>
                        </label>
                        <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} placeholder="Email Address" class="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label class="label">
                            <span class="text-base label-text">Password</span>
                        </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" class="w-full input input-bordered input-primary" />
                    </div>
                    <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                    <div>
                        <button class="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login