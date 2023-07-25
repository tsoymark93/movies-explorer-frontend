import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonMore from '../ButtonMore/ButtonMore';
import Preloader from '../Preloader/Preloader';

const Movies = ({ isLoader, showMoreButton }) => (
    <main className="movies">
        <SearchForm></SearchForm>
        {isLoader ? <Preloader></Preloader> : ''}
        <MoviesCardList>
            <MoviesCard isLiked={true} mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
            <MoviesCard isLiked={true} mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
            <MoviesCard mode="normal"></MoviesCard>
        </MoviesCardList>
        <ButtonMore isVisible={showMoreButton}></ButtonMore>
    </main>
);

export default Movies;
