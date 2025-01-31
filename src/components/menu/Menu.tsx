import "./menu.css"
import {AppDispatch, RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router";
import {logout} from "../../redux/slices/authSlice.ts";

export const Menu = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = () => {
        dispatch(logout());
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
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
                <li><Link to="/search">Search</Link></li>
            </ul>
        </nav>
    );
};