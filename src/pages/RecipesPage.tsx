import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState,} from "../redux/store";
import {fetchRecipes, fetchRecipesByTag} from "../redux/slices/recipeSlice";
import {useLocation, useNavigate} from "react-router";
import {RecipeList} from "../components/recipe/RecipeList.tsx";
import {Pagination} from "../components/pagination/Pagination.tsx";
import {SearchBar} from "../components/search/SearchBar.tsx";

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
    const tagFromUrl = queryParams.get("tag");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;

    const [currentPage, setCurrentPage] = useState(page);

    // useEffect(() => {
    //     dispatch(fetchRecipes({ page: currentPage, limit: recipesPerPage }));
    // }, [dispatch, currentPage]);

    useEffect(() => {
        if (tagFromUrl) {
            dispatch(fetchRecipesByTag({ tag: tagFromUrl}));
        } else {
            dispatch(fetchRecipes({ page: currentPage, limit: recipesPerPage }));
        }
    }, [dispatch, currentPage, tagFromUrl]);


    if (status === "loading") return <p>Завантаження...</p>;
    if (status === "failed") return <p>Не вдалося отримати рецепти</p>;

    const totalPages = Math.ceil(total / recipesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}${tagFromUrl ? `&tag=${tagFromUrl}` : ''}`);
        // navigate(`?page=${page}`);
    };
    // const handleTagClick = (tag: string) => {
    //     setCurrentTag(tag);
    //     setCurrentPage(1); // Скидаємо на першу сторінку при фільтрації
    //     navigate(`?page=1&tag=${tag}`);
    // };

    return (
        <div>
            <h1>Список рецептів</h1>
            <SearchBar searchType="recipes" />
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="recipe-item">
                        <RecipeList recipe={recipe} />
                    </li>
                ))}
            </ul>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};