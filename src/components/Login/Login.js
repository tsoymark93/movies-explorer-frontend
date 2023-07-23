import React from 'react';
import './Login.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import AuthInput from '../AuthInput/AuthInput';

const Login = () => (
    <>
        <AuthTitle title={`Рады видеть!`} />
        <div className="auth__inputs">
            <AuthInput name="E-mail" idName="email" type="email" value={'test@test.com'} />
            <AuthInput name="Пароль" idName="password" type="password" value={'test@test.com'} />
        </div>
        <AuthSubmit
            textButton="Войти"
            textPreLink="Еще не зарегистрированы? "
            textLink="Регистрация"
            urlLinkSubmit="/signup"
        />
    </>
);

export default Login;
