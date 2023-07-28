import React, { useState, useContext } from 'react';
import './Register.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import AuthInput from '../AuthInput/AuthInput';
import { validateName, validateEmail, validatePassword } from '../../utils/validation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Register = ({ isLoader, onRegister, errorSubmitApi }) => {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name || '');
    const [email, setEmail] = useState(currentUser.email || '');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onRegister({
            name: name,
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

    const handleNameChange = (newValue) => {
        setName(newValue);
        setIsNameValid(validateName(newValue) === '');
    };

    // Проверяем общую валидность формы
    const isValid = isEmailValid && isPasswordValid && isNameValid;

    return (
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <AuthTitle title={`Добро пожаловать!`} />
            <div className="auth__inputs">
                <AuthInput
                    name="Имя"
                    idName="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    isValid={isNameValid}
                />
                <span className="auth__input-error">{validateName(name)}</span>
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
                textButton={`${isLoader ? 'Идет регистрация...' : 'Зарегистрироваться'}`}
                textPreLink="Уже зарегистрированы? "
                textLink="Войти"
                textInfoSubmit={errorSubmitApi}
                urlLinkSubmit="/signin"
                disabled={!isValid} // Используем isValid для задания состояния disabled кнопки
            />
        </form>
    );
};

export default Register;
