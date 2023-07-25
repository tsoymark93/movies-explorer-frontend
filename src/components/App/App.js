import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Auth from '../Auth/Auth';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import './App.css';

function App() {
    const location = useLocation();
    const [isFooterDisabled, setIsFooterDisabled] = useState(false);
    const routesFootersDisabled = ['/signin', '/signup', '/profile', '/404'];
    const [isHeaderDisabled, setIsHeaderDisabled] = useState(false);
    const routesHeaderDisabled = ['/404'];

    useEffect(() => {
        if (routesFootersDisabled.includes(location.pathname)) {
            setIsFooterDisabled(true);
        }
        if (routesHeaderDisabled.includes(location.pathname)) {
            setIsHeaderDisabled(true);
        }
    }, [location.pathname]);

    return (
        <div className="App">
            {!isHeaderDisabled && <Header />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/saved-movies" element={<SavedMovies />} />
                <Route
                    path="/profile"
                    element={
                        <Auth isProfile={true}>
                            <Profile />
                        </Auth>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Auth>
                            <Login />
                        </Auth>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Auth>
                            <Register />
                        </Auth>
                    }
                />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
            {!isFooterDisabled && <Footer />}
        </div>
    );
}

export default App;
