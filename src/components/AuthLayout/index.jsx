import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const AuthLayout = ({ authentication }) => {

    const loggedInStatus = useSelector(state => state.auth.isLoggedIn);

    const navigate = useNavigate();

    // if (authentication && loggedInStatus !== authentication) {
    //     // if(true && false !== true)
    //     return <Navigate to="/signup" />
    // } else if (!authentication && loggedInStatus !== authentication) {
    //     // if(false && true !== false)
    //     return <Navigate to="/profile" />
    // }

    useEffect(() => {
        if (authentication && loggedInStatus !== authentication) {
            // if(true && false !== true)
            navigate("/signup")
        } else if (!authentication && loggedInStatus !== authentication) {
            // if(false && true !== false)
            navigate("/profile")
        }
    }, [loggedInStatus, authentication])

    return (
        <Outlet />
    )
}

export default AuthLayout