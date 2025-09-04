import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { BASE_URL } from '../utils/constent'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice'
import axios from 'axios'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
            // const data = await response.json();
            dispatch(setUser(response.data));
            console.log('User data:', response);
        } catch (error) {
            if (error.status === 401) {
                navigate("/login");
            };

            console.error('Error fetching user data:', error);
        };
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body
