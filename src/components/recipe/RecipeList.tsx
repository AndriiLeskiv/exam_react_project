import { IRecipes } from "../../models/recipes/IRecipes.ts";
import {Link, useNavigate} from "react-router";
import "./RecipeList.css"

interface RecipeListProps {
    recipe: IRecipes;
}

export const RecipeList = ({ recipe }: RecipeListProps) => {
    const navigate = useNavigate();

    const handleTagClick = (tag: string) => {
        navigate(`/recipes?tag=${tag}`);
    };

    return (
        <div className="recipe-item">
            <Link to={`/recipes/${recipe.id}`} className="recipe-title">
                {recipe.name}
            </Link>
            <div className="recipe-tags">
                {recipe.tags?.map((tag, index) => (
                    <span key={index} className="tag" onClick={() => handleTagClick(tag)}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};