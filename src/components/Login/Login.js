import React, { useState, useContext } from 'react';
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
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onLogin({
            email: email,
            password: password,
        });
    };

    const handleEmailChange = (newValue) => {
        setEmail(newValue);
        setIsEmailValid(validateEmail(newValue) === '');
    };

    const handlePasswordChange = (newValue) => {
        setPassword(newValue);
        setIsPasswordValid(validatePassword(newValue) === '');
    };

    // Проверяем общую валидность формы
    const isValid = isEmailValid && isPasswordValid;

    return (
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <AuthTitle title={`Рады видеть!`} />
            <div className="auth__inputs">
                <AuthInput
                    name="E-mail"
                    idName="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    isValid={isEmailValid}
                />
                <span className="auth__input-error">{validateEmail(email)}</span>
                <AuthInput
                    name="Пароль"
                    idName="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    isValid={isPasswordValid}
                />
                <span className="auth__input-error">{validatePassword(password)}</span>
            </div>
            <AuthSubmit
                textButton={`${isLoader ? 'Идет авторизация...' : 'Войти'}`}
                textPreLink="Еще не зарегистрированы? "
                textLink="Регистрация"
                textInfoSubmit={errorSubmitApi}
                urlLinkSubmit="/signup"
                disabled={!isValid} // Используем isValid для задания состояния disabled кнопки
            />
        </form>
    );
};

export default Login;
