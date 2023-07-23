import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => (
    <section className="checkbox">
        <span className="checkbox__text">Короткометражки</span>
        <input type="checkbox" className="checkbox__switcher" id="checkboxInput" defaultChecked />
    </section>
);

export default FilterCheckbox;
