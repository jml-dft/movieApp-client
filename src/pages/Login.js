import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Login() {

    const notyf = new Notyf();
    const { user, setUser } = useContext(UserContext);

    // State hooks for email, password, and button activity
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    // Function to handle authentication
    function authenticate(e) {
        e.preventDefault();

        fetch('https://movieapp-api-lms1.onrender.com/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.access !== undefined) {
                // Store token in localStorage
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                // Clear inputs after login
                setEmail('');
                setPassword('');
                notyf.success('You are now logged in');
            } else if (data.message === "Incorrect email or password") {
                notyf.error('Incorrect email or password');
            } else {
                notyf.error(`${email} does not exist`);
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
            notyf.error('Something went wrong. Please try again.');
        });
    }

    // Function to retrieve user details after successful login
    function retrieveUserDetails(token) {
        fetch('https://movieapp-api-lms1.onrender.com/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            });
        })
        .catch(error => {
            console.error("Error retrieving user details:", error);
        });
    }

    // Handle button activity based on input values
    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (    
        (user.id !== null)
        ? <Navigate to="/movies" />
        : <Form onSubmit={authenticate}>
            <h1 className="my-5 text-center">Login</h1>
            
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            { isActive ? 
                <Button variant="primary" type="submit" id="loginBtn">
                    Login
                </Button>
                : 
                <Button variant="danger" type="submit" id="loginBtn" disabled>
                    Login
                </Button>
            }
        </Form>
    );
}
