import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterShortMovies } from '../../utils/utils';

const RenderMovies = ({
    isLoader,
    movies,
    savedMovies,
    isChecked,
    pinMovie,
    unpinMovie,
    countMovies = movies.length,
}) => {
    const notFoundMovies = <h2 className="movies__card-list-title">Ничего не найдено</h2>;
    const renderMovies = filterShortMovies(movies, isChecked)
        .slice(0, countMovies)
        .map((movie) => {
            return (
                <MoviesCard
                    movie={movie}
                    savedMovies={savedMovies}
                    pinMovie={pinMovie}
                    unpinMovie={unpinMovie}
                    key={movie.id || movie._id}
                />
            );
        });

    return <>{!isLoader ? (renderMovies.length === 0 ? notFoundMovies : renderMovies) : ''}</>;
};

export default RenderMovies;
