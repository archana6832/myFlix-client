import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';



export function RegistrationView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [birthdateError, setBirthdateError] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();

        let setisValid = formValidation();
        if (setisValid) {
            //new user registration
            axios.post('https://myflix-moviesapp.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
                    alert('Welcome to myFlix');
                })
                .catch(e => {
                    alert('invalid data')
                    console.log('error registering the user')
                });
        };
    }

    //Form Validation

    const formValidation = () => {
        let usernameError = {};
        let passwordError = {};
        let emailError = {};
        let birthdateError = {};
        let isValid = true;

        if (username === '') {
            usernameError.usernameEmpty = alert("Please enter a valid username.");
            isValid = false;
        }

        if (username.trim().length < 5) {
            usernameError.usernameShort = alert("Username needs to be at least 5 characters long.");
            isValid = false;
        }


        if (password.trim().length < 5) {
            passwordError.passwordShort = alert("Password needs to be at least 5 characters long.");
            isValid = false;
        }

        if (!(email && email.includes(".") && email.includes("@"))) {
            emailError.emailNotEmail = alert("Please enter correct email address.");
            isValid = false;
        }
        if (birthday === '') {
            birthdateError.birthdateEmpty = alert("Please enter your birthday.");
            isValid = false;
        }
        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        setBirthdateError(birthdateError);
        return isValid;
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
                                        placeholder='Ente a username(minimum 5 characters)'
                                    />
                                    {Object.keys(usernameError).map((key) => {
                                        return (
                                            <div key={key}>
                                                {usernameError[key]}
                                            </div>
                                        );
                                    })}
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        minLength='5'
                                        placeholder='Password'
                                    />
                                    {Object.keys(passwordError).map((key) => {
                                        return (
                                            <div key={key}>
                                                {passwordError[key]}
                                            </div>
                                        );
                                    })}
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
                                    {Object.keys(emailError).map((key) => {
                                        return (
                                            <div key={key}>
                                                {emailError[key]}
                                            </div>
                                        );
                                    })}
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        type="birthday"
                                        onChange={e => setBirthday(e.target.value)}
                                        placeholder='Enter your Birthday'
                                    />
                                    {Object.keys(birthdateError).map((key) => {
                                        return (
                                            <div key={key}>
                                                {birthdateError[key]}
                                            </div>
                                        );
                                    })}
                                </Form.Group>

                                <Button variant="primary" type="submit"
                                    onClick={handleSubmit}>
                                    Register
                                </Button>
                                <p>Have an account? Login here</p>
                                <Link to="/">
                                    <Button variant="primary" type="button">Login
                                    </Button>
                                </Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>

    );
}


RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthdate: PropTypes.string.isRequired
    }),
};

