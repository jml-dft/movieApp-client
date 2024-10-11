import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard({ movieProp }) {
    // Destructure the movie fields from the movieProp
    const { _id, title, director, year, description, genre } = movieProp;

    return (
        <Card>
            <Card.Body>
                {/* Movie title */}
                <Card.Title>{title}</Card.Title>
                
                {/* Director */}
                <Card.Subtitle>Director:</Card.Subtitle>
                <Card.Text>{director}</Card.Text>
                
                {/* Year */}
                <Card.Subtitle>Year:</Card.Subtitle>
                <Card.Text>{year}</Card.Text>
                
                {/* Genre */}
                <Card.Subtitle>Genre:</Card.Subtitle>
                <Card.Text>{genre}</Card.Text>

                {/* Description */}
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>

                {/* Link to movie details */}
                <Link className="btn btn-primary" to={`/movies/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    );
}

// PropTypes for type checking
MovieCard.propTypes = {
    movieProp: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired
    }).isRequired
};
