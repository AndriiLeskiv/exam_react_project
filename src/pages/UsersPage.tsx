import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store.ts";
import {fetchUsers, setPage} from "../redux/slices/userSlice.ts";
import {UserCard} from "../components/user/UserCard.tsx";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {Pagination} from "../components/pagination/Pagination.tsx";
import {SearchBar} from "../components/search/SearchBar.tsx";

export const UsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const {users, total, currentPage, loading} = useSelector((state: RootState) => state.user);

    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = queryParams.get("page");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;

    useEffect(() => {
        if (page !== currentPage) {
            dispatch(setPage(page));
        }
    }, [dispatch, page, currentPage]);

    useEffect(() => {
        dispatch(fetchUsers({ page }));
    }, [dispatch, page]);

    const totalPages = Math.ceil(total / 30);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        navigate(`?page=${page}`);
    };

    return (
        <div>
            <h1>Список користувачів</h1>
            <SearchBar searchType="users" />
            <ul>
                {loading ? (
                    <p>Завантаження...</p>
                ) : users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>
                            <UserCard user={user} />
                        </li>
                    ))
                ) : (
                    <p>Немає користувачів</p>
                )}
            </ul>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};