import React from 'react';
import './Register.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import AuthInput from '../AuthInput/AuthInput';

const Register = () => (
    <>
        <AuthTitle title={`Добро пожаловать!`} />
        <div className="auth__inputs">
            <AuthInput name="Имя" idName="name" type="text" value={'Марк'} />
            <AuthInput name="E-mail" idName="email" type="email" value={'test@test.com'} />
            <AuthInput name="Пароль" idName="password" type="password" value={'test@test.com'} />
        </div>
        <AuthSubmit
            textButton="Зарегестрироваться"
            textPreLink="Уже зарегестрированы?"
            textLink="Войти"
            urlLinkSubmit="/signin"
        />
    </>
);
export default Register;
