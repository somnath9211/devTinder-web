
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constent';


const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
            dispatch(clearUser());
            navigate("/login");

        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    // console.log(user);
    return (
        <div className="navbar bg-base-200 shadow-sm">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">🧑‍💻DevTinder</Link>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end mx-6">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        {user && (
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        )}
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to={"/profile/view"} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link>Settings</Link></li>
                        <li><Link onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar