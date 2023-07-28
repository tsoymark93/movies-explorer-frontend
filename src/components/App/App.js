import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';

function App() {
    const location = useLocation();
    const history = useNavigate();
    const [currentUser, setCurrentUser] = useState({
        name: '',
        isLoggedIn: false,
        email: '',
        _id: '',
    });
    const [isLoader, setIsLoader] = useState(false);
    //  const [isTokenChecked, setIsTokenChecked] = useState(false);
    const [errorSubmitApi, setErrorSubmitApi] = useState('');
    const [isFooterDisabled, setIsFooterDisabled] = useState(false);
    const routesFootersDisabled = ['/signin', '/signup', '/profile', '/404'];
    const [isHeaderDisabled, setIsHeaderDisabled] = useState(false);
    const routesHeaderDisabled = ['/404'];

    /*
  useEffect(() => {
    if (currentUser.isLoggedIn && isTokenChecked) {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([user, dataCards]) => {
          setCurrentUser({ ...currentUser, ...user });
          setCards([...dataCards]);
        })
        .then(() => history.push('/'))
        .catch((err) => console.log(err));
    }
  }, [isTokenChecked, currentUser.isLoggedIn]);
*/

    const onLogin = ({ email, password }) => {
        setIsLoader(true);
        return mainApi
            .authorize({ email, password })
            .then((data) => {
                localStorage.setItem('token', data.token);
                setCurrentUser({ ...currentUser, isLoggedIn: true });
                history.push('/movies');
            })
            .catch((res) => {
                res.then((err) => {
                    setErrorSubmitApi(err.message);
                });
            })
            .finally(() => {
                setIsLoader(false);
            });
    };

    const onRegister = ({ name, email, password }) => {
        setIsLoader(true);
        return mainApi
            .register({ name, email, password })
            .then(() => {
                onLogin({ email, password });
            })
            .catch((res) => {
                res.then((err) => {
                    if (err.statusCode === 400) {
                        setErrorSubmitApi('При регистрации пользователя произошла ошибка.');
                    } else {
                        setErrorSubmitApi(err.message);
                    }
                });
            })
            .finally(() => {
                setIsLoader(false);
            });
    };

    // const checkToken = async (token) => {
    //     mainApi
    //         .getUser(token)
    //         .then((res) => {
    //             if (res) {
    //                 setCurrentUser({
    //                     ...currentUser,
    //                     isLoggedIn: true,
    //                     ...res,
    //                 });
    //             }
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setIsTokenChecked(true));
    // };

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [infoTooltipProps, setInfoTooltipProps] = useState({
        message: '',
        isError: false,
        buttonText: '',
        onSubmit: () => {},
    });
    const infoTooltipOpen = () => {
        setIsInfoTooltipOpen(true);
    };
    const closePopup = () => {
        setCurrentUser({ name: 'user' });
        setIsInfoTooltipOpen(false);
    };
    const onInputSearchError = () => {
        setInfoTooltipProps({
            ...infoTooltipProps,
            message: 'Нужно ввести ключевое слово',
            buttonText: 'OK',
            isError: true,
            onSubmit: closePopup,
        });
        infoTooltipOpen();
    };
    const errorGetMoviesPopupOpen = () => {
        setInfoTooltipProps({
            ...infoTooltipProps,
            message:
                'Во время запроса произошла ошибка. ' +
                'Возможно, проблема с соединением или сервер недоступен. ' +
                'Подождите немного и попробуйте ещё раз',
            buttonText: 'OK',
            isError: true,
            onSubmit: closePopup,
        });
        infoTooltipOpen();
    };

    useEffect(() => {
        if (routesFootersDisabled.includes(location.pathname)) {
            setIsFooterDisabled(true);
        }
        if (routesHeaderDisabled.includes(location.pathname)) {
            setIsHeaderDisabled(true);
        }
    }, [location.pathname]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {!isHeaderDisabled && <Header />}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/movies"
                        element={
                            <Movies
                                onInputSearchError={onInputSearchError}
                                errorGetMoviesPopupOpen={errorGetMoviesPopupOpen}
                            />
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <SavedMovies
                                onInputSearchError={onInputSearchError}
                                errorGetMoviesPopupOpen={errorGetMoviesPopupOpen}
                            />
                        }
                    />
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
                                <Login isLoader={isLoader} onLogin={onLogin} errorSubmitApi={errorSubmitApi} />
                            </Auth>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Auth>
                                <Register isLoader={isLoader} onRegister={onRegister} errorSubmitApi={errorSubmitApi} />
                            </Auth>
                        }
                    />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
                {!isFooterDisabled && <Footer />}
                <InfoTooltip
                    name="confirmation"
                    buttonText={infoTooltipProps.buttonText}
                    isError={infoTooltipProps.isError}
                    message={infoTooltipProps.message}
                    isOpen={isInfoTooltipOpen}
                    onClose={closePopup}
                    onSubmit={infoTooltipProps.onSubmit}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
