import React, { useState, useEffect } from 'react';
import './Profile.css';
import '../Auth/Auth.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthInput from '../AuthInput/AuthInput';
import AuthSubmit from '../AuthSubmit/AuthSubmit';

const Profile = () => {
    const [username, setUsername] = useState('Марк');
    const [email, setEmail] = useState('test@test.com');
    const [isEditMode, setIsEditMode] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const saveButtonStyleClass = 'auth__button-submit_type_profile-save';
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    // Состояния валидации для каждого инпута
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateForm = () => {
        const errors = [];

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (isEditMode) {
            if (trimmedUsername === '') {
                errors.push('Пожалуйста, введите имя.');
            } else if (!nameRegex.test(trimmedUsername)) {
                errors.push('Имя может содержать только буквы, пробелы и дефисы.');
            } else if (trimmedUsername.length < 2) {
                errors.push('Имя должно содержать минимум две буквы.');
            }

            if (trimmedEmail === '') {
                errors.push('Пожалуйста, введите email.');
            } else if (!emailRegex.test(trimmedEmail)) {
                errors.push('Пожалуйста, введите корректный email.');
            }
        }

        // Устанавливаем состояния валидации
        setIsUsernameValid(nameRegex.test(trimmedUsername) && trimmedUsername.length >= 2);
        setIsEmailValid(emailRegex.test(trimmedEmail));

        // Устанавливаем состояние активности кнопки в зависимости от наличия ошибок
        setIsSaveButtonActive(errors.length === 0);

        // Устанавливаем новый массив сообщений об ошибках
        setErrorMessages([...errors]);

        return errors.length === 0;
    };

    useEffect(() => {
        if (!isEditMode) {
            setErrorMessages([]);
        }
    }, [isEditMode]);

    const handleSaveProfile = () => {
        if (validateForm()) {
            setIsEditMode(false);
            setErrorMessages([]);
        }
    };

    const toggleEditing = () => {
        setIsEditMode((prevMode) => !prevMode);
    };

    return (
        <form className="auth__form auth__form_type_profile" noValidate>
            <AuthTitle title={`Привет, ${username}!`} isProfile={true} />
            {errorMessages.length > 0 && (
                <div className="auth__form_type_profile-error-messages">
                    {errorMessages.map((error, index) => (
                        <span key={index} className="auth__form_type_profile-error-message">
                            {error}
                        </span>
                    ))}
                </div>
            )}
            <div className={`auth__inputs auth__inputs_type_profile ${isEditMode ? 'editing' : ''}`}>
                <AuthInput
                    name="Имя"
                    idName="name"
                    type="type"
                    value={username}
                    isProfile={true}
                    onChange={(value) => {
                        setUsername(value);
                        validateForm();
                    }}
                    disabled={!isEditMode}
                    isValid={isUsernameValid}
                />

                <AuthInput
                    name="E-mail"
                    idName="email"
                    type="email"
                    value={email}
                    isProfile={true}
                    onChange={(value) => {
                        setEmail(value);
                        validateForm();
                    }}
                    disabled={!isEditMode}
                    isValid={isEmailValid}
                />
            </div>
            {isEditMode ? (
                <AuthSubmit
                    textButton="Сохранить"
                    textPreLink=""
                    textLink=""
                    isProfile={true}
                    urlLinkSubmit=""
                    onClick={handleSaveProfile}
                    customStyleClass={saveButtonStyleClass}
                    disabled={!isSaveButtonActive}
                />
            ) : (
                <AuthSubmit
                    textButton="Редактировать"
                    textPreLink=""
                    textLink="Выйти из аккаунта"
                    isProfile={true}
                    urlLinkSubmit="/logout"
                    onClick={toggleEditing}
                />
            )}
        </form>
    );
};

export default Profile;
