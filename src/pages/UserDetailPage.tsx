import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {AppDispatch, RootState} from "../redux/store.ts";
import {fetchUserById} from "../redux/slices/userSlice.ts";

export const UserDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    console.log(id);
    const dispatch = useDispatch<AppDispatch>();
    const {user, loading, error} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(Number(id)));
        }
    }, [id, dispatch]);


    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!user) return <p>Користувач не знайдений</p>;

    return (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <img src={user.image} alt={user.firstName} width="100"/>
            <p>Email: {user.email}</p>
            <p>Телефон: {user.phone}</p>
            <p>Стать: {user.gender}</p>
            <p>Дата народження: {user.birthDate}</p>
            <p>Університет: {user.university}</p>
            <p>Країна: {user.eyeColor}</p>
            <p>Статус: {user.age}</p>
            <p>Роль: {user.role}</p>
            <p>IP користувача: {user.ip}</p>
        </div>
    );
};