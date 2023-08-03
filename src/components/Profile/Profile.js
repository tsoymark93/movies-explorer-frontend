import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import '../Auth/Auth.css';
import AuthTitle from '../AuthTitle/AuthTitle';
import AuthInput from '../AuthInput/AuthInput';
import AuthSubmit from '../AuthSubmit/AuthSubmit';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Profile = ({ onSignOut, onUpdateUser, errorSubmitApi, clearErrorSubmitApi }) => {
    const currentUser = useContext(CurrentUserContext);

    const [initialUsername, setInitialUsername] = useState(currentUser.name || '');
    const [initialEmail, setInitialEmail] = useState(currentUser.email || '');
    const [username, setUsername] = useState(initialUsername);
    const [email, setEmail] = useState(initialEmail);
    const [isEditMode, setIsEditMode] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const saveButtonStyleClass = 'auth__button-submit_type_profile-save';
    const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);

    useEffect(() => {
        setIsSaveButtonActive(!errorSubmitApi); // Изначально разрешите кнопку, если ошибки нет
    }, [errorSubmitApi]);

    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);

    useEffect(() => {
        setUsername(currentUser.name || '');
        setEmail(currentUser.email || '');
        setInitialUsername(currentUser.name || '');
        setInitialEmail(currentUser.email || '');
    }, [currentUser]);

    useEffect(() => {
        const isUsernameChanged = username !== initialUsername;
        const isEmailChanged = email !== initialEmail;
        setIsSaveButtonActive(isEditMode && (isUsernameChanged || isEmailChanged));
    }, [username, email, initialUsername, initialEmail, isEditMode]);

    const validateForm = () => {
        const errors = [];

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

        setIsUsernameValid(nameRegex.test(trimmedUsername) && trimmedUsername.length >= 2);
        setIsEmailValid(emailRegex.test(trimmedEmail));

        setIsSaveButtonActive(errors.length === 0);

        setErrorMessages([...errors]);

        return errors.length === 0;
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateUser({
            email: email,
            name: username,
        });
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
            onUpdateUser({
                email: email,
                name: username,
            }).then(() => {
                clearErrorSubmitApi();
            });
            setInitialUsername(username);
            setInitialEmail(email);
        }
    };

    const toggleEditing = () => {
        setIsEditMode((prevMode) => !prevMode);
    };

    return (
        <main className="auth">
            <form className="auth__form auth__form_type_profile" onSubmit={handleSubmit} noValidate>
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
                        textInfoSubmit={errorSubmitApi}
                    />
                ) : (
                    <AuthSubmit
                        textButton="Редактировать"
                        textPreLink=""
                        textLink="Выйти из аккаунта"
                        isProfile={true}
                        urlLinkSubmit="/logout"
                        onClick={toggleEditing}
                        onSignOut={onSignOut}
                        textInfoSubmit={errorSubmitApi}
                    />
                )}
            </form>
        </main>
    );
};

export default Profile;
