import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './CustomNavbar.css';
import { FaFontAwesomeFlag as Logo } from "react-icons/fa";

const CustomNavbar = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    return (
        <nav className="CustomNavbar">
            <div className="LeftSide">
                <Link to={"/"} className="NavItem Logo">
                    <Logo/>
                </Link>
            </div>
            <div className="RightSide">
                {!currentUser && (
                    <div className="Auth">
                        <Link to={"/login"} className="NavItem">
                            <span>Login</span>
                        </Link>
                        <Link to={"/register"} className="NavItem">
                            <span>Register</span>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default CustomNavbar;