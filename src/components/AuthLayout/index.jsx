import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const AuthLayout = ({ authentication }) => {

    const loggedInStatus = useSelector(state => state.auth.isLoggedIn);

    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && loggedInStatus !== authentication) {
            navigate("/signup")
        } else if (!authentication && loggedInStatus !== authentication) {
            navigate("/profile")
        }
    }, [loggedInStatus, authentication])

    return (
        <Outlet />
    )
}

export default AuthLayout