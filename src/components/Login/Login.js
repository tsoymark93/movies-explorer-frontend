import React, { useState } from 'react';
import './Login.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import AuthInput from '../AuthInput/AuthInput';

const Login = () => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('');

    const handleEmailChange = (newValue) => {
        setEmail(newValue);
    };

    const handlePasswordChange = (newValue) => {
        setPassword(newValue);
    };

    return (
        <>
            <AuthTitle title={`Рады видеть!`} />
            <div className="auth__inputs">
                <AuthInput
                    name="E-mail"
                    idName="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange} // Pass the onChange function to the AuthInput component
                />
                <AuthInput
                    name="Пароль"
                    idName="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange} // Pass the onChange function to the AuthInput component
                />
            </div>
            <AuthSubmit
                textButton="Войти"
                textPreLink="Еще не зарегистрированы? "
                textLink="Регистрация"
                urlLinkSubmit="/signup"
            />
        </>
    );
};

export default Login;
