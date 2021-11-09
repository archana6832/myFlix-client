import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: 'Silence of the Lambs',
                    Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
                    Genre: 'Thriller',
                    Director: 'Jonathan Demme',
                    ImagePath: './img/Silenceofthelambs.jpg'
                },
                {
                    _id: 2,
                    Title: 'The 40-Year-Old Virgin',
                    Description: 'Goaded by his buddies, a nerdy guy who has never done the deed only finds the pressure mounting when he meets a single mother.',
                    Genre: 'Comedy',
                    Director: 'Judd Apatow',
                    ImagePath: '...'
                },
                {
                    _id: 3,
                    Title: 'Panic Room',
                    Description: 'A divorced woman and her diabetic daughter take refuge in their newly-purchased house\'s safe room, when three men break in searching for a missing fortune.',
                    Genre: 'Thriller',
                    Director: 'David Fincher',
                    ImagePath: '...'
                }
            ],
            selectedMovie: null
        }
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;


        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }

}

export default MainView;