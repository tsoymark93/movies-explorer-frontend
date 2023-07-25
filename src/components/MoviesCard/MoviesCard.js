import React, { useState } from 'react';
import './MoviesCard.css';
import testImage from '../../images/pic__COLOR_pic.png';

const MoviesCard = ({ mode }) => {
    const [liked, setLiked] = useState(false);

    function toggleLikedState() {
        setLiked(!liked);
    }

    return (
        <li className="movies__card">
            <div className="movies__card-info">
                <p className="movies__card-title">33 слова о дизайне</p>
                <p className="movies__card-duration">1ч 47м</p>
                <button
                    className={`movies__card-button ${liked ? 'movies__card-button_liked' : ''} ${
                        mode === 'liked' ? 'movies__card-button_type_liked' : ''
                    }`}
                    onClick={toggleLikedState}
                ></button>
            </div>
            <img className="movies__card-image" src={testImage} alt="Постер фильма: 33 слова о дизайне" />
        </li>
    );
};

export default MoviesCard;
