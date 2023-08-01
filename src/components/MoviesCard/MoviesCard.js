import React, { useState, useEffect, useContext } from 'react';
import './MoviesCard.css';
import { BASE_IMAGE_URL } from '../../utils/constants';
import { convertToHoursMinutes } from '../../utils/utils';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ModalTrailer from '../ModalTrailer/ModalTrailer';

const MoviesCard = ({ movie, savedMovies, pinMovie, unpinMovie, mode }) => {
    const [liked, setLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (location.pathname === '/movies') {
            const isOwner = savedMovies.some(
                (savedMovie) => savedMovie.movieId === movie.id && savedMovie.owner === currentUser._id,
            );
            setLiked(isOwner);
        }
    }, []);

    const handleButton = () => {
        if (location.pathname === '/movies') {
            liked ? unpinMovie(savedMovies.find((item) => item.movieId === movie.id)) : pinMovie(movie);
        } else {
            unpinMovie(movie);
        }
        setLiked((state) => !state);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const name = movie.nameRU;
    const duration = convertToHoursMinutes(movie.duration);
    const urlImage = location.pathname === '/movies' ? `${BASE_IMAGE_URL}${movie.image.url}` : movie.image;
    const trailerLink = movie.trailerLink;

    return (
        <li className="movies__card">
            <div className="movies__card-info">
                <p className="movies__card-title">{name}</p>
                <p className="movies__card-duration">{duration}</p>
                <button
                    className={`movies__card-button ${liked ? 'movies__card-button_liked' : ''} ${
                        mode === 'liked' ? 'movies__card-button_type_liked' : ''
                    }`}
                    onClick={handleButton}
                />
            </div>
            <button className="link movies__card-trailerLink" onClick={handleOpenModal}>
                <img className="movies__card-image" src={urlImage} alt="Фото" />
            </button>
            {showModal && <ModalTrailer onClose={handleCloseModal} trailerLink={trailerLink} />}
        </li>
    );
};

export default MoviesCard;
