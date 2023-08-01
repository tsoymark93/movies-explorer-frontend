import React, { useEffect } from 'react';
import './ModalTrailer.css';
import YouTube from 'react-youtube';

const ModalTrailer = ({ onClose, trailerLink }) => {
    const getYouTubeVideoId = (url) => {
        if (!url || typeof url !== 'string' || !url.includes('v=')) return ''; // Add additional checks for the validity of the url
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    };

    const opts = {
        // height: '315',
        // width: '560',
        playerVars: {
            autoplay: 1, // Autoplay the video
        },
    };

    // Check if the trailerLink exists or is a non-empty string, if not, return null
    if (!trailerLink || typeof trailerLink !== 'string') return null;

    // Function to handle closing the modal
    const handleCloseModal = () => {
        onClose();
    };

    // Add event listeners to handle escape key press and overlay click
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };

        const handleOverlayClick = (event) => {
            if (event.target.classList.contains('modal')) {
                handleCloseModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleOverlayClick);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleOverlayClick);
        };
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="modal-close" onClick={handleCloseModal}>
                    &times;
                </button>
                <YouTube videoId={getYouTubeVideoId(trailerLink)} opts={opts} />
            </div>
        </div>
    );
};

export default ModalTrailer;
