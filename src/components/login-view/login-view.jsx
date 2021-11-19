import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss'; //import .scss 
import { Container, Form, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
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