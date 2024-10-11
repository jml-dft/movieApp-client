import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function MovieView() {
    const notyf = new Notyf();
    const { movieId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [movieDetails, setMovieDetails] = useState({
        title: '',
        director: '',
        year: '',
        description: '',
        genre: '',
        comments: [],
    });

    // Fetch movie data based on movieId
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/${movieId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data = await response.json();
                setMovieDetails({
                    title: data.title,
                    director: data.director,
                    year: data.year,
                    description: data.description,
                    genre: data.genre,
                    comments: data.comments || [], // Default to empty array if no comments
                });
            } catch (error) {
                notyf.error(error.message);
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovie();
    }, [movieId]);

    const { title, director, year, description, genre, comments } = movieDetails;

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h2">{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Director: {director}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Year: {year}</Card.Subtitle>
                            <Card.Text className="mt-3">{description}</Card.Text>
                            <Card.Subtitle className="mt-4">Genre: {genre}</Card.Subtitle>
                            
                            <Card.Subtitle className="mt-4">Comments:</Card.Subtitle>
                            <ListGroup className="mb-3">
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        <ListGroup.Item key={index}>{comment}</ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>No comments yet.</ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
