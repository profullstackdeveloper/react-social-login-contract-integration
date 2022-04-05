import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {
    console.log(children);
    const auth = localStorage.getItem('user');
    return (
        auth ? children : <Navigate to={'/login'}></Navigate>
    )
}