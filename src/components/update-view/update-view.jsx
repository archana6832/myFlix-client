import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import './update-view.scss';

export function UpdateView(user) {

    const [Name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    // get from local storage
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const handleUpdate = (e) => {
        e.preventDefault();

        console.log(user);
        axios.put(`https://myflix-moviesapp.herokuapp.com/users/${username}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday

        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('user has been updated');

            })
            .catch(e => {
                console.log('error updating the user')
            });
    };

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

    return (
        <Form className='registrationForm'>
            <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" required onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="pasword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" required onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="email" required onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="birthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="birthday" required onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button className="buttons" variant="danger" onClick={() => { onBackClick(null); }}>Back</Button>
            <Button variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
            <Button variant="danger" type="button" onClick={handleDeregister}>deregister</Button>
        </Form>
    );
}