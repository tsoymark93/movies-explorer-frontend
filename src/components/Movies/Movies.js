import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCards from '../MoviesCards/MoviesCards';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';

const Movies = ({ isLoader, showMoreButton }) => (
    <main className="movies">
        <SearchForm></SearchForm>
        {isLoader ? <Preloader></Preloader> : ''}
        <MoviesCards>
            <MoviesCard isLiked={true} mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
            <MoviesCard isLiked={true} mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
        </MoviesCards>
        <ButtonMore isVisible={showMoreButton}></ButtonMore>
    </main>
);

export default Movies;
