import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

export default function AdminView({ moviesData, fetchData }) {
    const [movies, setMovies] = useState([]);

    // Getting the moviesData from the movies page
    useEffect(() => {
        console.log(moviesData);

        const moviesArr = moviesData.map(movie => {
            return (
                <tr key={movie._id}>
                    <td>{movie._id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.director}</td>
                    <td>{movie.year}</td>
                    <td>{movie.description}</td>
                    <td className={movie.isActive ? "text-success" : "text-danger"}>
                        {movie.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td>

                        <Button variant="warning" onClick={() => handleUpdateMovie(movie)}>Update</Button>
                    </td>
                    <td>

                        <Button variant="danger" onClick={() => handleDeleteMovie(movie._id)}>Delete</Button>
                    </td>
                </tr>
            );
        });

        setMovies(moviesArr);
    }, [moviesData]);


    const handleUpdateMovie = (movie) => {

        const newTitle = prompt("Enter new movie title:", movie.title);
        if (newTitle) {

            fetch(`https://movieapp-api-lms1.onrender.com/movies/${movie._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Movie updated:", data);
                fetchData(); // Refresh movie list
            });
        }
    };


    const handleDeleteMovie = (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            fetch(`https://movieapp-api-lms1.onrender.com/movies/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                console.log("Movie deleted:", data);
                fetchData();
            });
        }
    };

    return (
        <>
            <h1 className="text-center my-4">Admin Dashboard</h1>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {movies}
                </tbody>
            </Table>
        </>
    );
}
