import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomNavbar from '../../components/navbar/CustomNavbar';
import './NotFound.css';

const NotFound = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    return (
        <div>
            <div className="Bg" />
            <div className="NotFound">
                <CustomNavbar />
                <div className="Card">
                    <div className="Card-Header">
                        <span>Oups !</span>
                    </div>
                    <div className="Card-body">
                        <p>
                            Could not find the page you are looking for. Try to search our
                            <Link to={"/home"} className="NavItem">
                                <span>homepage.</span>
                            </Link>
                        </p>
                        <p>
                            Here are some other links you might find helpful:
                        </p>

                        {!currentUser ? (
                            <ul>
                                <li>
                                    <Link to={"/login"} className="NavItem">
                                        <span>Login</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/register"} className="NavItem">
                                        <span>Register</span>
                                    </Link>
                                </li>
                            </ul>
                        ) :
                        (
                            <ul>
                                <Link to={"/entry"} className="NavItem">
                                    <span>Dashboard</span>
                                </Link>
                            </ul>

                        )}
                    </div>
                    <div className="Card-Footer">
                        <p>
                            Visit our 
                            <Link to={"/support"} className="NavItem">
                                <span>support page</span>
                            </Link> 
                            for any questions. (404)
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default NotFound;