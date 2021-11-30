import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss'; //import .scss 
import { Container, Form, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://myflix-moviesapp.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };
    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Header>Please Login</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder='Username'
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            minLength='8'
                                            placeholder='Password'
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit"
                                        onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    <p>New User? Register here</p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};