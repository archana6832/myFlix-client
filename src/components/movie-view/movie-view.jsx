import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import axios from 'axios';
import { Link } from "react-router-dom";

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
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>

                <button onClick={() => { onBackClick(null); }}>Back</button>
                <button variant="dark" onClick={() => this.addFavorite(movie)}>Add to Favorites</button>

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
