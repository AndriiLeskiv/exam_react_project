import {createBrowserRouter} from "react-router";
import App from "../App.tsx";
import {AuthPage} from "../pages/AuthPage.tsx";
import {UsersPage} from "../pages/UsersPage.tsx";
import {UserDetailPage} from "../pages/UserDetailPage.tsx";
import {RecipesPage} from "../pages/RecipesPage.tsx";
import {RecipeDetailPage} from "../pages/RecipeDetailPage.tsx";
import {HomePage} from "../pages/HomePage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/', element: <App/>, children: [
            {index: true, element: <HomePage/>},
            {path: "login", element: <AuthPage/>},
            {path: "users", element: <UsersPage/>},
            {path: "/users/:id", element: <UserDetailPage/>},
            {path: "recipes", element: <RecipesPage/>},
            {path: "recipes/:id", element: <RecipeDetailPage/>}
        ]
    }
]);