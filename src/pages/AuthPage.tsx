import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice.ts";
import { fetchUser } from "../redux/slices/userSlice.ts";
import { RootState } from "../redux/store.ts";
import { AppDispatch } from "../redux/store.ts";

export const AuthPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>(); // Типізуємо dispatch як AppDispatch
    const { loading, error, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const loginResult = await dispatch(login({ username, password })).unwrap();
            if (loginResult.accessToken) {
                await dispatch(fetchUser()).unwrap();
            }
        } catch (err) {
            console.error("Помилка авторизації:", err);
        }
    };

    return (
        <div className="auth-page">
            <h2>Авторизація</h2>
            {isAuthenticated ? (
                <p>Ви вже авторизовані!</p>
            ) : (
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Логін"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Завантаження..." : "Увійти"}
                    </button>
                </form>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};