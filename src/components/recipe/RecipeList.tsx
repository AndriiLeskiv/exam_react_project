import { IRecipes } from "../../models/recipes/IRecipes.ts";
import {Link} from "react-router";
import "./RecipeList.css"

interface RecipeListProps {
    recipe: IRecipes;
}

export const RecipeList = ({ recipe }: RecipeListProps) => {
    return (
        <div className="recipe-item">
            <Link to={`/recipes/${recipe.id}`} className="recipe-title">
                {recipe.name}
            </Link>
            <div className="recipe-tags">
                {recipe.tags?.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};