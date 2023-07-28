import React from 'react';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterShortMovies } from '../../utils/utils';

const RenderMovies = ({ isLoader, movies, isChecked, countMovies = movies.length }) => {
    const preloader = isLoader ? <Preloader /> : '';
    const notFoundMovies = <h2 className="movies__card-list-title">Ничего не найдено</h2>;
    const renderMovies = filterShortMovies(movies, isChecked)
        .slice(0, countMovies)
        .map((movie) => {
            return <MoviesCard movie={movie} key={movie.id} />;
        });

    return <>{isLoader ? preloader : renderMovies.length === 0 ? notFoundMovies : renderMovies}</>;
};

export default RenderMovies;
