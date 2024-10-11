import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import UserContext from '../context/UserContext';

export default function Movies() {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState([]);

    const fetchData = async () => {
        const fetchUrl = user.isAdmin 
            ? "https://movieapp-api-lms1.onrender.com/movies/all" 
            : "https://movieapp-api-lms1.onrender.com/movies/";

        try {
            const response = await fetch(fetchUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();

            // Assuming the API returns an array of movies
            if (Array.isArray(data)) {
                setMovies(data);
            } else {
                console.error('Unexpected response format', data);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    return (
        user.isAdmin 
            ? <AdminView moviesData={movies} fetchData={fetchData} />
            : <UserView moviesData={movies} />
    );
}
