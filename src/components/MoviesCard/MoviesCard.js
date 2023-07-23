import React, { useState } from 'react';
import './MoviesCard.css';
import testImage from '../../images/pic__COLOR_pic.png';

const MoviesCard = ({ mode }) => {
    const [liked, setLiked] = useState(false);

    function toggleLikedState() {
        setLiked(!liked);
    }

    return (
        <li className="movie-card">
            <div className="movie-card__info">
                <p className="movie-card__name">33 слова о дизайне</p>
                <p className="movie-card__duration">1ч 47м</p>
                <button
                    className={`movie-card__button ${liked ? 'movie-card__button_liked' : ''} ${
                        mode === 'liked' ? 'movie-card__button_type_liked' : ''
                    }`}
                    onClick={toggleLikedState}
                ></button>
            </div>
            <img className="movie-card__image" src={testImage} alt="Постер фильма: 33 слова о дизайне" />
        </li>
    );
};

export default MoviesCard;
