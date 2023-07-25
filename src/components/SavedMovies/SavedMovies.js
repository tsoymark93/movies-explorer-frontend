import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ isLoader }) => (
    <main className="movies movies_type_saved">
        <SearchForm></SearchForm>
        {isLoader ? <Preloader></Preloader> : ''}
        <MoviesCardList>
            <MoviesCard isSaved={true} mode="liked"></MoviesCard>
            <MoviesCard isSaved={true} mode="liked"></MoviesCard>
        </MoviesCardList>
    </main>
);

export default SavedMovies;
