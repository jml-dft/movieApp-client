import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

export default function UserView({ moviesData }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const activeMovies = moviesData.map(movie => {
            // Render only active movies
            if (movie.isActive) {
                return <MovieCard movieProp={movie} key={movie._id} />;
            }
            return null;
        });

        // Set the movies state to the active movies list
        setMovies(activeMovies);
    }, [moviesData]);

    return (
        <>
            {/* Render the movie cards */}
            {movies}
        </>
    );
}
