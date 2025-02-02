import {FC, useEffect, useState} from "react";

interface SearchBarProps {
    searchType: "recipes" | "users";
    onSearch(value: string): void;
    search: string
}

export const SearchBar:FC<SearchBarProps> = ({ searchType, onSearch, search }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () =>{
        onSearch(query);
    };
    useEffect(() => {
        setQuery(search);
    }, [search]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={`Пошук ${searchType === "recipes" ? "рецептів" : "користувачів"}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>🔍</button>
        </div>
    );
};