import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store.ts";
import { searchItems } from "../../redux/slices/searchSlice.ts";

interface SearchBarProps {
    searchType: "recipes" | "users";

}

export const SearchBar: FC<SearchBarProps> = ({ searchType }) => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { results, status, error } = useSelector((state: RootState) => state.search);

    const handleSearch = () => {
        if (query.trim() !== "") {
            dispatch(searchItems({ query, type: searchType }));
            console.log('results',results);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={`Пошук ${searchType === "recipes" ? "рецептів" : "користувачів"}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>🔍</button>

            {status === "loading" && <p>Завантаження...</p>}
            {error && <p className="error">{error}</p>}

            {status === "succeeded" && results.length > 0 && (
                <ul className="search-results">
                    {results.map((item) => (
                        <li key={item.id}>
                            {searchType === "recipes" ? item.name : item.firstName}
                        </li>
                    ))}
                </ul>
            )}

            {status === "succeeded" && results.length === 0 && (
                <p>Нічого не знайдено.</p>
            )}
        </div>
    );
};