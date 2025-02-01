import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {AppDispatch, RootState} from "../redux/store.ts";
import {fetchUserById, setSelectedUser} from "../redux/slices/userSlice.ts";
import {fetchRecipesByUserId } from "../redux/slices/recipeSlice.ts";

export const UserDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    console.log(id);
    const dispatch = useDispatch<AppDispatch>();
    const { users, selectedUser, loading, error } = useSelector((state: RootState) => state.user);
    const { userRecipes} = useSelector((state: RootState) => state.recipe);

    useEffect(() => {
        const user = users.find((u) => u.id === Number(id));
        if (user) {
            dispatch(setSelectedUser(user));
        } else {
            dispatch(fetchUserById(Number(id)));
        }
        dispatch(fetchRecipesByUserId(Number(id)));
    }, [dispatch, id, users]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;
    if (!selectedUser) return <p>Користувач не знайдений</p>;

    return (
        <div>
            <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
            <img src={selectedUser.image} alt={selectedUser.firstName} width="100"/>
            <p>Email: {selectedUser.email}</p>
            <p>Телефон: {selectedUser.phone}</p>
            <p>Стать: {selectedUser.gender}</p>
            <p>Дата народження: {selectedUser.birthDate}</p>
            <p>Університет: {selectedUser.university}</p>
            <p>Країна: {selectedUser.eyeColor}</p>
            <p>Статус: {selectedUser.age}</p>
            <p>Роль: {selectedUser.role}</p>
            <p>IP користувача: {selectedUser.ip}</p>

            <h3>Рецепти користувача:</h3>
            {userRecipes.length > 0 ? (
                <ul>
                    {userRecipes.map((recipe) => (
                        <li key={recipe.id}>
                            <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Рецепти не знайдено.</p>
            )}
        </div>
    );
};