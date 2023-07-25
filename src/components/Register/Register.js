// Register.js

import React, { useState } from 'react';
import './Register.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import AuthInput from '../AuthInput/AuthInput';

const Register = () => {
    const [name, setName] = useState('Марк');
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('');

    const handleNameChange = (newValue) => {
        setName(newValue);
    };

    const handleEmailChange = (newValue) => {
        setEmail(newValue);
    };

    const handlePasswordChange = (newValue) => {
        setPassword(newValue);
    };

    return (
        <>
            <AuthTitle title={`Добро пожаловать!`} />
            <div className="auth__inputs">
                <AuthInput name="Имя" idName="name" type="text" value={name} onChange={handleNameChange} />
                <AuthInput name="E-mail" idName="email" type="email" value={email} onChange={handleEmailChange} />
                <AuthInput
                    name="Пароль"
                    idName="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <AuthSubmit
                textButton="Зарегистрироваться"
                textPreLink="Уже зарегистрированы? "
                textLink="Войти"
                urlLinkSubmit="/signin"
            />
        </>
    );
};

export default Register;
