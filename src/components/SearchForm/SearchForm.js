import React, { useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useInput from '../../utils/useInput';
import { useLocation } from 'react-router-dom';

const SearchForm = ({ onSubmit, onInputSearchError, initialName = '', isChecked, handleInputChecked }) => {
    const searchInput = useInput({});
    const location = useLocation();

    useEffect(() => {
        searchInput.setValue(initialName);
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (location.pathname == '/movies') localStorage.setItem('name', searchInput.value);
        searchInput.value != '' ? onSubmit(searchInput.value) : onInputSearchError();
    };

    return (
        <form className="search-form" onSubmit={handleSubmit} noValidate>
            <div className="search-form__container">
                <input
                    className="search-form__input"
                    placeholder="Фильм"
                    onChange={searchInput.onChange}
                    defaultValue={initialName}
                    required
                />
                <button className="link search-form__button" type="submit" />
            </div>
            <FilterCheckbox onChange={handleInputChecked} isChecked={isChecked} />
        </form>
    );
};
export default SearchForm;
