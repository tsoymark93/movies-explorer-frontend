// ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Element, isLoggedIn, ...rest }) {
    return isLoggedIn ? <Element {...rest} /> : <Navigate to="/" />;
}

export default ProtectedRoute;
