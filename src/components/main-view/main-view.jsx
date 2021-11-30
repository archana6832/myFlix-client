import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'; // React Bootstrap
import './main-view.scss'; //import .scss

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {

    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: null
        };
    }
    getMovies(token) {
        axios.get('https://myflix-moviesapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //code below integrates with the API information hosted by heroku (linked to MongoDB Atlas)
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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
            registered
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
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
                    <Container>
                        <Navbar variant="dark" expand="lg" className="mainNavbar">
                            <Container>
                                <Navbar.Brand href="#home">myFlix</Navbar.Brand>
                                <Nav className="me-auto">
                                    <Nav.Link href="#home">Movies</Nav.Link>
                                    <Nav.Link href="#user">Profile</Nav.Link>
                                    <button onClick={() => { this.onLoggedOut() }}>Logout</button>
                                </Nav>
                            </Container>
                        </Navbar>


                        <Row className="justify-content-lg-center">
                            {selectedMovie
                                ? (
                                    <Col md={8}>
                                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                    </Col>
                                )
                                : movies.map(movie => (
                                    <Col md={3}>
                                        <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                    </Col>
                                ))
                            }
                        </Row>

                    </Container>

                </div>

            );
        }
    }
}


export default MainView;