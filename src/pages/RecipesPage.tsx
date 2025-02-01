import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState,} from "../redux/store";
import {fetchRecipes} from "../redux/slices/recipeSlice";
import {useLocation, useNavigate} from "react-router";
import {RecipeList} from "../components/recipe/RecipeList.tsx";

export const RecipesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const recipes = useSelector((state: RootState) => state.recipe.recipes);
    const total = useSelector((state: RootState) => state.recipe.total);
    const status = useSelector((state: RootState) => state.recipe.status);

    const recipesPerPage = 30;

    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = queryParams.get("page");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;

    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        dispatch(fetchRecipes({ page: currentPage, limit: recipesPerPage }));
    }, [dispatch, currentPage]);

    if (status === "loading") return <p>Завантаження...</p>;
    if (status === "failed") return <p>Не вдалося отримати рецепти</p>;

    const totalPages = Math.ceil(total / recipesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    return (
        <div>
            <h1>Список рецептів</h1>
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="recipe-item">
                        <RecipeList recipe={recipe} />
                    </li>
                ))}
            </ul>
            {totalPages > 1 && (
                <div className="pagination-container">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Попередня
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Наступна
                    </button>
                </div>
            )}
        </div>
    );
};