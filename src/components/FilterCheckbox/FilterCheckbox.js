import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => (
    <label className="checkbox">
        <span className="checkbox__text">Короткометражки</span>
        <input type="checkbox" className="checkbox__switcher" id="checkboxInput" defaultChecked />
    </label>
);

export default FilterCheckbox;
