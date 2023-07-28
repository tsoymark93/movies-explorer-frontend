import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { moviesApi } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/utils';
import RenderMovies from '../RenderMovies/RenderMovies';

const SavedMovies = ({ onInputSearchError, errorGetMoviesPopupOpen }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [movies, setMovies] = useState([]);

    const getMovies = (name = '') => {
        setIsLoader(true);
        moviesApi
            .getMovies()
            .then((dataMovies) => {
                setMovies([...filterMovies(dataMovies, name)]);
            })
            .catch(() => errorGetMoviesPopupOpen())
            .finally(() => {
                setIsLoader(false);
            });
    };
    const handleSearchSubmit = (name) => {
        getMovies(name);
    };

    useEffect(() => {
        getMovies();
    }, []);

    const handleInputChecked = (evt) => {
        setIsChecked(evt.target.checked);
    };

    return (
        <main className="movies">
            <SearchForm
                onSubmit={handleSearchSubmit}
                isChecked={isChecked}
                onInputSearchError={onInputSearchError}
                handleInputChecked={handleInputChecked}
            />
            <MoviesCardList>
                <RenderMovies movies={movies} isLoader={isLoader} isChecked={isChecked} />
            </MoviesCardList>
        </main>
    );
};

export default SavedMovies;
