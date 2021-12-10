
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";
import './update-view.scss';

export function UpdateView(user) {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    //form validation
    const [userNameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [birthdateError, setBirthdateError] = useState({});


    // get from local storage
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const handleUpdate = (e) => {
        e.preventDefault();
        let setisValid = formValidation();
        if (setisValid) {
            //Update user
            console.log(user);

            axios.put(`https://myflix-moviesapp.herokuapp.com/users/${username}`, {
                Username: userName,
                Password: password,
                Email: email,
                Birthday: birthday,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('User details has been updated');
                    localStorage.setItem('user', userName);
                })

                .catch(e => {
                    alert('Error')
                    console.log('Error updating the user')
                });
        };
    }

    const handleDeregister = () => {
        const token = localStorage.getItem('token');
        console.log('deregister request submitted');
        axios.delete(`https://myflix-moviesapp.herokuapp.com/users/${username}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(res => {
                console.log(res.data);
                alert('User deregistered successfully');
                localStorage.clear();
                window.open("/", "_self");
            })
            .catch(err => {
                console.log(err, 'Deregistration did not succeed');
            })
    }
    //Form Validation

    const formValidation = () => {
        let userNameError = {};
        let passwordError = {};
        let emailError = {};
        let birthdateError = {};
        let isValid = true;

        if (userName === '') {
            userNameError.userNameEmpty = alert("Please enter your username.");
            isValid = false;
        }

        if (userName.trim().length < 5) {
            userNameError.userNameShort = alert("Username needs to be at least 5 characters long.");
            isValid = false;
        }


        if (password.trim().length < 8) {
            passwordError.passwordShort = alert("Password needs to be at least 8 characters long.");
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
        setUsernameError(userNameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        setBirthdateError(birthdateError);
        return isValid;
    };

    return (
        <Form className='updateForm'>
            <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" required
                    onChange={e => setUsername(e.target.value)} />
                {Object.keys(userNameError).map((key) => {
                    return (
                        <div key={key}>
                            {userNameError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <Form.Group controlId="pasword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" required onChange={e => setPassword(e.target.value)} />
                {Object.keys(passwordError).map((key) => {
                    return (
                        <div key={key}>
                            {passwordError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" required onChange={e => setEmail(e.target.value)} />
                {Object.keys(emailError).map((key) => {
                    return (
                        <div key={key}>
                            {emailError[key]}
                        </div>
                    );
                })}
            </Form.Group>

            <Form.Group controlId="birthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="birthday" required onChange={e => setBirthday(e.target.value)} />
                {Object.keys(birthdateError).map((key) => {
                    return (
                        <div key={key}>
                            {birthdateError[key]}
                        </div>
                    );
                })}
            </Form.Group>
            {/*<Link to={`/profile`}>
                <Button variant="secondary" type="button">Back</Button>
            </Link>*/}

            <Button variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
            <Button variant="danger" type="button" onClick={handleDeregister}>deregister</Button>
        </Form>
    );
}

UpdateView.propTypes = {
    update: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
    }),
};