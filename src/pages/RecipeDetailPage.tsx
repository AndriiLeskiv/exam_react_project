import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {fetchRecipeById, setSelectedRecipe} from "../redux/slices/recipeSlice";
import {Link, useParams} from "react-router";

export const RecipeDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    console.log(id);

    const { selectedRecipe, recipes, status } = useSelector((state: RootState) => state.recipe);

    useEffect(() => {
        const recipe = recipes.find((r) => r.id === Number(id));
        if (recipe) {
            dispatch(setSelectedRecipe(recipe));
        } else {
            dispatch(fetchRecipeById(Number(id)));
        }
    }, [dispatch, id, recipes]);

    if (status === "loading") return <p>Завантаження...</p>;
    if (status === "failed") return <p>Помилка при завантаженні рецепту.</p>;
    if (!selectedRecipe) return <p>Рецепт не знайдено</p>;

    console.log('selectedRecipe', selectedRecipe);

    return (
        <div>
            <h1>{selectedRecipe.name}</h1>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} width="300" />
            <p><strong>Інгредієнти:</strong></p>
            <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <p><strong>Інструкція:</strong></p>
            <ol>
                {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>

            <p><strong>Час приготування:</strong> {selectedRecipe.prepTimeMinutes} хв.</p>
            <p><strong>Калорії на порцію:</strong> {selectedRecipe.caloriesPerServing}</p>
            <p><strong>Кухня:</strong> {selectedRecipe.cuisine}</p>
            <p>Цей рецепт створив: <Link to={`/users/${selectedRecipe.userId}`}>Переглянути профіль</Link></p>
        </div>
    );
};