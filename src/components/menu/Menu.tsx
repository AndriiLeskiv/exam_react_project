import "./Menu.css"
import {AppDispatch, RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router";
import {logout} from "../../redux/slices/authSlice.ts";

export const Menu = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { firstName, image } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav>
            <div className="logo">
                <Link to="/">MyApp</Link>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                        <li className="user-profile">
                            {image && <img src={image} alt="User Logo" className="user-logo" />}
                            <span>{firstName ? firstName : "User"}</span>
                        </li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};