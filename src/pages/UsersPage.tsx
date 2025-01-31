import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../redux/store.ts";
import {fetchUsers, setPage} from "../redux/slices/userSlice.ts";
import {UserCard} from "../components/user/UserCard.tsx";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export const UsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { users, total, currentPage, loading } = useSelector((state: RootState) => state.user);

    console.log('users', users);

    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = queryParams.get("page");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;

    useEffect(() => {
        if (page !== currentPage) {
            dispatch(setPage(page));
        }
        dispatch(fetchUsers({ page }));
    }, [dispatch, page, currentPage]);

    const totalPages = Math.ceil(total / 30);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
        navigate(`?page=${page}`);
    };

    return (
        <div>
            <h1>Список користувачів</h1>
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

            <div className="pagination-container">
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
            </div>
        </div>
    );
};