import React from 'react';
import './AuthSubmit.css';
import { Link } from 'react-router-dom';

const AuthSubmit = ({ textButton, textPreLink, textLink, isProfile = false, urlLinkSubmit }) => {
    const classContainer = `auth__submit-container${isProfile ? ' auth__submit-container_type_profile' : ''}`;
    const classButton = `link auth__button-submit${isProfile ? ' auth__button-submit_type_profile' : ''}`;
    const classText = `auth__text${isProfile ? ' auth__text_type_profile' : ''}`;
    const classLink = `link auth__link${isProfile ? ' auth__link_type_profile' : ''}`;

    return (
        <div className={classContainer}>
            <button className={classButton} type="button">
                {textButton}
            </button>
            <p className={classText}>
                {textPreLink}
                <Link to={urlLinkSubmit} className={classLink}>
                    {textLink}
                </Link>
            </p>
        </div>
    );
};

export default AuthSubmit;
