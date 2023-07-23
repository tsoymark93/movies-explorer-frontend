import React from 'react';
import './SavedMovies.css';
import MoviesCards from '../MoviesCards/MoviesCards';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ isLoader }) => (
    <main className="movies movies_type_saved">
        <SearchForm></SearchForm>
        {isLoader ? <Preloader></Preloader> : ''}
        <MoviesCards>
            <MoviesCard isSaved={true} mode="liked"></MoviesCard>
            <MoviesCard isSaved={true} mode="liked"></MoviesCard>
        </MoviesCards>
    </main>
);

export default SavedMovies;
