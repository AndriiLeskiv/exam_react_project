import React from "react";
import {IUser} from "../../models/user/IUser.ts";
import {Link} from "react-router";
import "./UserCard.css";

interface UserCardProps {
    user: IUser;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className="user-card">
            <img src={user.image} alt={user.firstName} width="50" />
            <Link to={`/users/${user.id}`}>
                <h3>{user.firstName} {user.lastName}</h3>
            </Link>
            <p>Email: {user.email}</p>
            <p>Телефон: {user.phone}</p>
            <p>Стать: {user.gender}</p>
            <p>Дата народження: {user.birthDate}</p>
        </div>
    );
};