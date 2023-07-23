import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => (
    <form className="search-form">
        <div className="search-form__container">
            <input className="search-form__input" placeholder="Фильм" />
            <button className="link search-form__button" />
        </div>
        <FilterCheckbox></FilterCheckbox>
    </form>
);

export default SearchForm;
