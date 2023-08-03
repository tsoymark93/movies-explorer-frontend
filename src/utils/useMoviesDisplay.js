import { useEffect, useState } from 'react';
import { filterShortMovies, filterMovies } from './utils';

const useMoviesDisplay = ({ movies, isChecked, initialName }) => {
    const [windowSize, setWindowsSize] = useState(window.innerWidth);
    const [countMovies, setCountMovies] = useState(0);
    const [isButtonMoreEnabled, setIsButtonMoreEnabled] = useState(false);

    const handleWindowSize = () => {
        setWindowsSize(window.innerWidth);
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
        } else if (windowSize >= 768) {
            setCountMovies(8);
        } else {
            setCountMovies(5);
        }
    }, [windowSize]);

    useEffect(() => {
        const foundMovies = filterMovies(movies, initialName);
        const filterIsCheckedMovies = filterShortMovies(foundMovies, isChecked);
        filterIsCheckedMovies.length > countMovies ? setIsButtonMoreEnabled(true) : setIsButtonMoreEnabled(false);
    }, [countMovies, movies, isChecked, initialName]);

    const handleButtonMore = () => {
        if (windowSize >= 1280) {
            setCountMovies((prevCount) => prevCount + 3);
        } else if (windowSize >= 768) {
            setCountMovies((prevCount) => prevCount + 2);
        } else {
            setCountMovies((prevCount) => prevCount + 2);
        }
    };

    return { countMovies, isButtonMoreEnabled, handleButtonMore };
};

export default useMoviesDisplay;
