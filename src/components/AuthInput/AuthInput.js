import React from 'react';
import './AuthInput.css';

const AuthInput = ({ name, idName, type, value, isProfile = false, onChange, disabled }) => {
    const isPassword = type === 'password';
    const isPasswordValid = isPassword ? value.length > 6 : true;

    const classContainer = `auth__input-container${isProfile ? ' auth__input-container_type_profile' : ''}`;
    const classLabel = `auth__label${isProfile ? ' auth__label_type_profile' : ''}`;
    const classInput = `auth__input${isProfile ? ' auth__input_type_profile' : ''}`;
    const classInputError = `auth__input-error${isProfile ? ' auth__input-error_type_profile' : ''}`;

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        onChange(inputValue); // Вызываем переданный извне обработчик onChange
    };

    return (
        <div className={classContainer}>
            <label className={classLabel} htmlFor={`auth-${idName}`}>
                {name}
            </label>
            <input
                className={`${classInput} ${isPassword && !isPasswordValid ? 'auth__input_error' : ''}`}
                id={`auth-${idName}`}
                placeholder={name}
                type={type}
                value={value}
                onChange={handleInputChange}
                disabled={disabled} // Используем переданное извне свойство disabled
            />
            {isPassword && !isPasswordValid && (
                <span className={`${classInputError} auth__input-error_active`}>
                    Пароль должен быть длиннее 6 символов
                </span>
            )}
            {!isPassword && <span className={classInputError}></span>}
        </div>
    );
};

export default AuthInput;
