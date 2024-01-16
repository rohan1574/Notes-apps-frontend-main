import React, { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const { user, loader } = useContext(UserProvider)

    if (loader) {
        return <h1>loading...........</h1>
    }

    if (user) {
        return children
    }
    // return <Navigate state={location.pathname} to='/login'></Navigate>
    return <Navigate to='/'></Navigate>
};

export default ProtectedRoute;