import React, { useState } from 'react';
import './MoviesCard.css';
import { BASE_IMAGE_URL } from '../../utils/constants';
import { convertToHoursMinutes } from '../../utils/utils';

const MoviesCard = ({ movie, mode }) => {
    const [liked, setLiked] = useState(false);

    function toggleLikedState() {
        setLiked(!liked);
    }
    const name = movie.nameRU;
    const duration = convertToHoursMinutes(movie.duration);
    const urlImage = `${BASE_IMAGE_URL}${movie.image.url}`;
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
                    onClick={toggleLikedState}
                ></button>
            </div>
            <a href={trailerLink} className="link movies__card-trailerLink" target="_blank" rel="noreferrer">
                <img className="movies__card-image" src={urlImage} alt="Фото" />
            </a>{' '}
        </li>
    );
};

export default MoviesCard;
