import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { FaUser as UserIcon } from 'react-icons/fa';
import { BiRun as LogOutIcon } from 'react-icons/bi';
import './CustomPopupMenu.css';

const CustomPopupMenu = () => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
        return <Redirect to="/login" />;
    };

    return (
        <div className="CustomPopupMenu">
            <div className="Header">
                <span>WELCOME!</span>
            </div>
            <ul>
                <li className="popup-item">
                    <Link to={"/profile"} className="Link">
                        <UserIcon/>
                        <span className="item-text">My profile</span>
                    </Link>
                </li>
                <li className="popup-item">
                    <div onClick={logOut}>
                        <LogOutIcon/>
                        <span className="item-text">Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default CustomPopupMenu;