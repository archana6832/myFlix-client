import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text className="labelname">Director: {movie.Director.Name}</Card.Text>
                    <Card.Text className="labelname"> Genre: {movie.Genre.Name}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="secondary" type="button">Details</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}


MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.string
        }),
    }).isRequired
};

