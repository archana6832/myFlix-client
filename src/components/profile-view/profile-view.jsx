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



    render() {
        const { user, onBackClick } = this.props;
        console.log(user);

        return (
            <Container>
                <Card className="profile-view">
                    <Card.Header>
                        <div className="userdetails">
                            <span className="label">User Details: </span>
                            <span className="value">{this.state.user}</span>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="username">
                            <span className="label">Username: </span>
                            <span className="value">{user.Username}</span>
                        </div>
                        <div className="Password">
                            <span className="label">Password: </span>
                            <span className="value">******</span>
                        </div>
                        <div className="Email">
                            <span className="label">Email: </span>
                            <span className="value">{user.Email}</span>
                        </div>
                        <div className="Birthday">
                            <span className="label">Birthday: </span>
                            <span className="value">{user.Birthday}</span>
                        </div>

                        <Button className="buttons" variant="danger" onClick={() => { onBackClick(null); }}>Back</Button>

                    </Card.Body>
                </Card>
            </Container>

        );
    }
}
