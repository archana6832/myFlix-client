import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux'; //react-redux

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions';//actions movies
import { setUser } from '../../actions/actions';//actions user
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'; // React Bootstrap
import './main-view.scss'; //import .scss

import MoviesList from '../movies-list/movies-list';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card'; // will be imported and used in MoviesList 
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../update-view/update-view';


class MainView extends React.Component {

    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            userObject: null
        };
    }
    getUser(token) {
        const username = localStorage.getItem("user");

        axios.get(`https://myflix-moviesapp.herokuapp.com/users/${username}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                // Action added
                this.setState({ userObject: response.data });

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    getMovies(token) {
        axios.get('https://myflix-moviesapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Action added
                this.props.setMovies(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //code below integrates with the API information hosted by heroku (linked to MongoDB Atlas)
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.props.setUser(localStorage.getItem('user'));
            this.getMovies(accessToken);
            this.getUser(accessToken);
        }
    }


    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user */

    onLoggedIn(authData) {
        console.log(authData);
        this.props.setUser({ user: authData.user.Username });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    // User Logout to erase the token and username from local storage
    onLoggedOut() {
        localStorage.clear();
        window.open("/", "_self");
    };

    render() {
        let { movies } = this.props;
        let { user } = this.props;
        return (
            <Container>
                <Router>
                    <Navbar variant="dark" expand="lg" className="mainNavbar">

                        <Navbar.Brand href="/">myFlix</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            {/* <Nav.Link href="/profile">{user}</Nav.Link>*/}
                            <Nav.Link onClick={() => { this.onLoggedOut() }}>
                                {user ? "Logout" : "LogIn"}
                            </Nav.Link>

                        </Nav>
                    </Navbar>

                    <Row className="main-view justify-content-md-center">

                        <Route exact path="/" render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <MoviesList movies={movies} />;//MovieList added
                        }} />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col>
                                <RegistrationView />
                            </Col>
                        }} />

                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/directors/:name" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route path="/profile" render={({ history }) => {
                            if (movies.length === 0) return <div className="main-view"></div>;
                            return <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />

                        }} />
                        <Route path="/update" render={({ history }) => {
                            return <UpdateView user={this.state.userObject} onBackClick={() => history.goBack()} />
                        }} />
                    </Row>
                </Router>
            </Container>
        );
    }
}


let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}


export default connect(mapStateToProps, { setUser, setMovies })(MainView);

