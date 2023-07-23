import React, { useState } from 'react';
import './AuthInput.css';
import useInput from '../../utils/useInput';

const AuthInput = ({ name, idName, type, value, isProfile = false }) => {
    const input = useInput({ inputValue: value });
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const classContainer = `auth__input-container${isProfile ? ' auth__input-container_type_profile' : ''}`;
    const classLabel = `auth__label${isProfile ? ' auth__label_type_profile' : ''}`;
    const classInput = `auth__input${isProfile ? ' auth__input_type_profile' : ''}`;
    const classInputError = `auth__input-error${isProfile ? ' auth__input-error_type_profile' : ''}`;

    const validatePassword = (password) => password.length > 6; // Пример проверки: пароль должен быть длиннее 6 символов
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        input.onChange(event);

        if (type === 'password') {
            // Проверяем валидацию пароля и устанавливаем состояние isPasswordValid
            setIsPasswordValid(validatePassword(inputValue));
        }
    };

    return (
        <div className={classContainer}>
            <label className={classLabel} htmlFor={`auth-${idName}`}>
                {name}
            </label>
            <input
                className={`${classInput} ${type === 'password' && !isPasswordValid ? 'auth__input_error' : ''}`}
                id={`auth-${idName}`}
                placeholder={name}
                type={type}
                value={input.value}
                onChange={handleInputChange}
            />
            {type === 'password' && !isPasswordValid && (
                <span className={`${classInputError} auth__input-error_active`}>
                    Пароль должен быть длиннее 6 символов
                </span>
            )}
            {type !== 'password' && <span className={classInputError}></span>}
        </div>
    );
};

export default AuthInput;
