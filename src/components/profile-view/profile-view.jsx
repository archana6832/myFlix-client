import React from "react";
import axios from "axios";
import { Form, Button, Row, Col, Card, Container, } from "react-bootstrap";
import { setState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from "react-router-dom";
import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        const username = localStorage.getItem("user");
        axios
            .get(`https://myflix-moviesapp.herokuapp.com/users/${username}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,

                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    removeFavorite(movie) {
        let token = localStorage.getItem('token');
        let url = 'https://myflix-moviesapp.herokuapp.com/users/' + localStorage.getItem('user')
            + '/movies/' + movie._id;
        axios
            .delete(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert("Movie was removed");
                this.componentDidMount();
            });
    }


    render() {
        const { user, onBackClick } = this.props;
        console.log(user);

        return (
            <Container>
                <Card className="profile-view">
                    <Card.Header>
                        <div className="userdetails">
                            <span className="label">User Details: </span>
                            <span className="value">{this.state.Username}</span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="username">
                            <span className="label">Username: </span>
                            <span className="value">{this.state.Username}</span>
                        </div>
                        <div className="Password">
                            <span className="label">Password: </span>
                            <span className="value">******</span>
                        </div>
                        <div className="Email">
                            <span className="label">Email: </span>
                            <span className="value">{this.state.Email}</span>
                        </div>
                        <div className="Birthday">
                            <span className="label">Birthday: </span>
                            <span className="value">{this.state.Birthday}</span>
                        </div>

                        <Button className="buttons" variant="danger" onClick={() => { onBackClick(null); }}>Back</Button>
                        <span>
                            <Button className="buttons" href="/update" variant="primary">Update </Button>
                        </span>
                    </Card.Body>
                </Card>
                <Card className="cardFav">

                    <Card.Header className="header">Favorite Movies:</Card.Header>

                    <Row>
                        {this.state.FavoriteMovies.map((movie) => {
                            return (
                                <Col xs={8} md={6} lg={4} xl={4}>

                                    <Card>
                                        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
                                        <Card.Body>
                                            <Card.Title>{movie.Title}</Card.Title>
                                            <Button className="buttons" variant="dark" onClick={() => this.removeFavorite(movie)}>Click to Remove</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                        )}
                    </Row>

                </Card>
            </Container>

        );
    }
}
