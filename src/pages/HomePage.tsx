import {Link} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store.ts";
import {useEffect} from "react";
import {fetchUser} from "../redux/slices/userSlice.ts";

export const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { firstName, image, loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUser());
        }
    }, [dispatch, isAuthenticated]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="home-page">
            <h1>Welcome to My Website!</h1>
            {!isAuthenticated ? (
                <div className="auth-message">
                    <p>To access more features, you need to <Link to="/login">log in</Link>.</p>
                </div>
            ) : (
                <div className="welcome-message">
                    {image && <img src={image} alt="User Logo" className="user-logo" />}
                    <p>Welcome back, dear {firstName ? firstName : " user"}! Enjoy browsing our content.</p>
                </div>
            )}
        </div>
    );
};