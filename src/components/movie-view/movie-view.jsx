import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';


//Class component MovieView
export class MovieView extends React.Component {

    addFavorite(movie) {
        const token = localStorage.getItem('token');
        let url = "https://myflix-moviesapp.herokuapp.com/users/" + localStorage.getItem('user')
            + "/movies/" + movie._id;
        console.log(url);
        axios
            .post(url, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Movie was added to favorites");

            });
    }

    render() {

        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} crossOrigin="anonymous" />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div>
                    <Link className="label" to={`/directors/${movie.Director.Name}`}>
                        Director: {movie.Director.Name}
                    </Link>
                </div>
                <div>
                    <Link className="label" to={`/genres/${movie.Genre.Name}`}>
                        Genre: {movie.Genre.Name}
                    </Link>
                </div>
                {/*<div className="bottomButtons">
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant='dark' className="movie-buttons">Director: {movie.Director.Name}</Button>
                    </Link>

                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant='dark' className="movie-buttons">Genre: {movie.Genre.Name}</Button>
                    </Link>
        </div>*/}

                <div className="bottomButtons">
                    <Button className="backButton" variant="danger" onClick={() => { onBackClick(null); }}>Back</Button>
                    <Button className="favButton" variant="dark" onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
                </div>

            </div>
        );
    }
}
MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
