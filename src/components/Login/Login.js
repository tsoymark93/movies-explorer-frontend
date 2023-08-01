import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import AuthInput from '../AuthInput/AuthInput';
import { validateEmail, validatePassword } from '../../utils/validation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Login = ({ isLoader, onLogin, errorSubmitApi }) => {
    const currentUser = useContext(CurrentUserContext);

    const [email, setEmail] = useState(currentUser.email || '');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Check form validity whenever any input changes
        const isEmailValid = validateEmail(email) === '';
        const isPasswordValid = validatePassword(password) === '';
        setIsFormValid(isEmailValid && isPasswordValid);
    }, [email, password]);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onLogin({
            email: email,
            password: password,
        });
    };

    const handleEmailChange = (newValue) => {
        setEmail(newValue);
    };

    const handlePasswordChange = (newValue) => {
        setPassword(newValue);
    };

    return (
        <main className="auth">
            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                <AuthTitle title={`Рады видеть!`} />
                <div className="auth__inputs">
                    <AuthInput
                        name="E-mail"
                        idName="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        isValid={validateEmail(email) === ''}
                    />
                    <span className="auth__input-error">{validateEmail(email)}</span>
                    <AuthInput
                        name="Пароль"
                        idName="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        isValid={validatePassword(password) === ''}
                    />
                    <span className="auth__input-error">{validatePassword(password)}</span>
                </div>
                <AuthSubmit
                    textButton={`${isLoader ? 'Идет авторизация...' : 'Войти'}`}
                    textPreLink="Еще не зарегистрированы? "
                    textLink="Регистрация"
                    textInfoSubmit={errorSubmitApi}
                    urlLinkSubmit="/signup"
                    disabled={!isFormValid}
                />
            </form>
        </main>
    );
};

export default Login;
