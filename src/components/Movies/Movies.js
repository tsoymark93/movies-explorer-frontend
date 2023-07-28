import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ButtonMore from '../ButtonMore/ButtonMore';
import { moviesApi } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/utils';
import RenderMovies from '../RenderMovies/RenderMovies';
import useMoviesDiplay from '../../utils/useMoviesDisplay';

const Movies = ({ onInputSearchError, errorGetMoviesPopupOpen }) => {
    const [isLoader, setIsLoader] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [movies, setMovies] = useState([]);
    const moviesDisplay = useMoviesDiplay({ movies, isChecked });

    const initialCheckbox = () => {
        return (localStorage.getItem('checkbox') || '') === 'true' ? true : false;
    };
    const initialNameValue = () => {
        return localStorage.getItem('name') || '';
    };

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
        setIsChecked(initialCheckbox());
        getMovies(initialNameValue());
    }, []);

    const handleInputChecked = (evt) => {
        setIsChecked(evt.target.checked);
        localStorage.setItem('checkbox', evt.target.checked);
    };

    return (
        <main className="movies">
            <SearchForm
                onSubmit={handleSearchSubmit}
                onInputSearchError={onInputSearchError}
                handleInputChecked={handleInputChecked}
                isChecked={isChecked}
                initialName={initialNameValue()}
            ></SearchForm>
            <MoviesCardList>
                <RenderMovies
                    movies={movies}
                    isLoader={isLoader}
                    isChecked={isChecked}
                    countMovies={moviesDisplay.countMovies}
                />
            </MoviesCardList>
            {moviesDisplay.isButtonMoreEnabled ? <ButtonMore onClick={moviesDisplay.handleButtonMore} /> : ''}
        </main>
    );
};
export default Movies;
