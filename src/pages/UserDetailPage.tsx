import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {AppDispatch, RootState} from "../redux/store.ts";
import {fetchUserById, setSelectedUser} from "../redux/slices/userSlice.ts";
import {fetchRecipesByUserId} from "../redux/slices/recipeSlice.ts";

export const UserDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const {users, selectedUser, loading, error} = useSelector((state: RootState) => state.user);
    const {userRecipes} = useSelector((state: RootState) => state.recipe);

    useEffect(() => {
        const user = users.find((u) => u.id === Number(id));
        if (user) {
            dispatch(setSelectedUser(user));
        } else {
            dispatch(fetchUserById(Number(id)));
        }
        dispatch(fetchRecipesByUserId(Number(id)));
    }, [dispatch, id, users]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!selectedUser) return <p>User not found!</p>;

    return (
        <div className="details_result">
            <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
            <img src={selectedUser.image} alt={selectedUser.firstName} width="100"/>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Gender: {selectedUser.gender}</p>
            <p>Date of birth: {selectedUser.birthDate}</p>
            <p>University: {selectedUser.university}</p>
            <p>Country: {selectedUser.eyeColor}</p>
            <p>Status: {selectedUser.age}</p>
            <p>Role: {selectedUser.role}</p>
            <p>User IP: {selectedUser.ip}</p>

            <h3>User recipes:</h3>
            {userRecipes.length > 0 ? (
                <ul>
                    {userRecipes.map((recipe) => (
                        <li key={recipe.id}>
                            <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recipes found.</p>
            )}
        </div>
    );
};