import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    //code below integrates with the API information hosted by heroku (linked to MongoDB Atlas)
    componentDidMount() {
        axios.get('https://myflix-moviesapp.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //below code invokes a function which updates the state of selectedMovie to the specific movie 
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    //the function updates the user property to the specific user

    onRegistration(registered) {
        this.setState({
            registered,
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(user) {
        this.setState({
            user
        });
    }



    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        //If there is no registered user the registration view is rendered.  If a user registers in registration details are passed as a prop to RegistrationView
        if (!registered) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} />;
        //If there is no identified user then the login view is rendered and the user details are passed as a prop to LoginView
        if (!user)
            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;



        if (movies.length === 0) {
            return <div className="main-view" />;

        } else {
            return (
                <div className="main-view">
                    {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} /> :
                        movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />))
                    }
                </div>
            );
        }
    }
}


export default MainView;