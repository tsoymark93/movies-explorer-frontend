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

    const validateForm = () => {
        const errors = [];
        if (isEditMode && username.trim() === '') {
            errors.push('Пожалуйста, введите корректное имя.');
        }
        if (isEditMode && email.trim() === '') {
            errors.push('Пожалуйста, введите корректный email.');
        }
        if (isEditMode && email.indexOf('@') === -1) {
            errors.push('Пожалуйста, введите корректный email.');
        }

        // Устанавливаем состояние активности кнопки в зависимости от наличия ошибок
        setIsSaveButtonActive(errors.length === 0);

        // Устанавливаем новый массив сообщений об ошибках
        setErrorMessages([...errors]);
        return errors.length === 0;
    };

    // Очищаем сообщения об ошибках при переключении обратно в режим просмотра
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
        <>
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
                        validateForm(); // Вызовите функцию validateForm при изменении ввода
                    }}
                    disabled={!isEditMode}
                />

                <AuthInput
                    name="E-mail"
                    idName="email"
                    type="email"
                    value={email}
                    isProfile={true}
                    onChange={(value) => {
                        setEmail(value);
                        validateForm(); // Вызовите функцию validateForm при изменении ввода
                    }}
                    disabled={!isEditMode}
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
        </>
    );
};

export default Profile;
