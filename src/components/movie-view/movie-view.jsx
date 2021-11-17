import React from 'react';

export class MovieView extends React.Component {


    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} crossOrigin="anonymous" />
                </div>

                <div className="movie-title">
                    <div className="label">Title: </div>
                    <div className="value">{movie.Title}</div>
                </div>
                <div className="movie-description">
                    <div className="label">Description: </div>
                    <div className="value">{movie.Description}</div>
                </div>
                <div className="movie-genre">
                    <div className="label">Genre: </div>
                    <div className="value">{movie.Genre}</div>
                </div>
                <div className="movie-director">
                    <div className="label">Director: </div>
                    <div className="value">{movie.Director}</div>
                </div>

                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>



        );
    }
}