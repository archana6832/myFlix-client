import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);

        props.onRegistration(username);

    };

    return (
        <Row>
            <Col>
                <CardGroup>
                    <Card>
                        <Card.Header>Please register</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group >
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        placeholder='Enter a username'
                                    />
                                </Form.Group>

                                <Form.Group >
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

                                <Form.Group >
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        placeholder='Enter your Email address'
                                    />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        type="birthday"
                                        onChange={e => setBirthday(e.target.value)}
                                        placeholder='Enter your Birthday'
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit"
                                    onClick={handleSubmit}>
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>

    );
}


RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};



