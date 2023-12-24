import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ isAuth }) => {
    if (!isAuth) {
        return <Navigate to={"/"} />
    }
    return <Outlet />
}

export default ProtectedRoute