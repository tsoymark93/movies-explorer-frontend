import { useEffect, useState } from 'react';
import { filterShortMovies, filterMovies } from './utils';

const useMoviesDisplay = ({ movies, isChecked, initialName }) => {
    const [windowSize, setWindowsSize] = useState(window.screen.width);
    const [countMovies, setCountMovies] = useState(0);
    const [isButtonMoreEnabled, setIsButtonMoreEnabled] = useState(false);

    const handleWindowSize = () => {
        setWindowsSize(window.screen.width);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => {
            window.removeEventListener('resize', handleWindowSize);
        };
    }, []);

    useEffect(() => {
        if (windowSize >= 1280) {
            setCountMovies(12);
        } else if (windowSize < 1280 && windowSize >= 768) {
            setCountMovies(8);
        } else {
            setCountMovies(5);
        }
    }, [windowSize, movies]);

    useEffect(() => {
        const foundMovies = filterMovies(movies, initialName);
        const filterIsCheckedMovies = filterShortMovies(foundMovies, isChecked);
        filterIsCheckedMovies.length > countMovies ? setIsButtonMoreEnabled(true) : setIsButtonMoreEnabled(false);
    }, [countMovies, movies, isChecked, initialName]);

    const handleButtonMore = () => {
        if (windowSize >= 1280) {
            setCountMovies(countMovies + 3);
        } else if (windowSize < 1280 && windowSize >= 768) {
            setCountMovies(countMovies + 2);
        } else {
            setCountMovies(countMovies + 2);
        }
    };

    return { countMovies, isButtonMoreEnabled, handleButtonMore };
};

export default useMoviesDisplay;
