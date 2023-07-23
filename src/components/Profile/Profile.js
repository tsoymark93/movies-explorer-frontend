import React from 'react';
import './Profile.css';
import '../Auth/Auth.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthInput from '../AuthInput/AuthInput';
import AuthSubmit from '../AuthSubmit/AuthSubmit';

const Profile = () => (
    <>
        <AuthTitle title={`Привет, Марк!`} isProfile={true} />
        <div className="auth__inputs auth__inputs_type_profile">
            <AuthInput name="Имя" idName="name" type="type" value={'Марк'} isProfile={true} />
            <AuthInput name="E-mail" idName="email" type="email" value={'test@test.com'} isProfile={true} />
        </div>
        <AuthSubmit textButton="Редактировать" textPreLink="" textLink="Выйти из аккаунта" isProfile={true} />
    </>
);

export default Profile;
