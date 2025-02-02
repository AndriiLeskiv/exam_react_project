import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/slices/authSlice.ts";
import {fetchUser} from "../../redux/slices/userSlice.ts";
import {RootState} from "../../redux/store.ts";
import {AppDispatch} from "../../redux/store.ts";
import {useNavigate} from "react-router";
import './AuthPage.css';

export const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {loading, error, isAuthenticated} = useSelector(
        (state: RootState) => state.auth
    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const loginResult = await dispatch(login({username, password})).unwrap();
            if (loginResult.accessToken) {
                await dispatch(fetchUser()).unwrap();
                navigate('/');
            }
        } catch (err) {
            console.error("Authorization error:", err);
        }
    };

    return (
        <div className="auth-page">
            <h2>Authorization</h2>
            {isAuthenticated ? (
                <p>You are already logged in!</p>
            ) : (
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Login"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Log in"}
                    </button>
                </form>
            )}
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};