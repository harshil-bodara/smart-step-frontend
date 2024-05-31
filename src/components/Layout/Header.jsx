import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { IMG_LOGO } from '../Images'
import { authLogout } from '../../redux/features/AuthSlice';

const Header = () => {

    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const userData = useSelector(state => state.auth.userData)

    console.log("userData >>", userData);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(authLogout());
    }

    return (
        <header>
            <div className="site-navigation main_menu menu-2" id="mainmenu-area">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link className="navbar-brand" tp="/">
                            <img src={IMG_LOGO} alt="Smart Step Logo" className="img-fluid header-logo" width={60} />
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarMenu">

                            <ul className="navbar-nav ml-auto">

                                {/* <li className="nav-item ">
                                    <a href="#" className="nav-link js-scroll-trigger">
                                        About
                                    </a>
                                </li> */}
                                <li className="nav-item ">
                                    <Link to="/explore" className="nav-link js-scroll-trigger">
                                        Explore
                                    </Link>
                                </li>
                                {/* <li className="nav-item ">
                                    <a href="#" className="nav-link">
                                        Contact
                                    </a>
                                </li> */}
                                {isLoggedIn && <li className="nav-item ">
                                    <Link to="/profile" className="nav-link">
                                        Profile
                                    </Link>
                                </li>}
                            </ul>

                            {!isLoggedIn && <Link to="/login" className="btn btn-main btn-small">
                                <i className="fa fa-sign-in-alt mr-2"></i>Login
                            </Link>}

                            {isLoggedIn && <ul className="header-contact-right d-none d-lg-block">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbar3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-user mr-2"></i>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbar3">
                                        <Link className="dropdown-item " to="/profile">
                                            {userData?.fullName}
                                        </Link>
                                        <a className="dropdown-item " href="#" onClick={handleLogout}>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>}

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header