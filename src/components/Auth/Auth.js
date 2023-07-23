import React from 'react';
import './Auth.css';

const Auth = ({ children, isProfile = false }) => {
    const classForm = `auth__form${isProfile ? ' auth__form_type_profile' : ''}`;

    return (
        <main className="auth">
            <form className={classForm} action="form" noValidate>
                {children}
            </form>
        </main>
    );
};

export default Auth;
