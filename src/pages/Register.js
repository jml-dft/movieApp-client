import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function Register() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    // Checks if all fields are filled correctly
    useEffect(() => {
        if (
            email !== "" &&
            password !== ""
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    function registerUser(e) {
        // Prevents page redirection via form submission
        e.preventDefault();

        fetch('https://movieapp-api-lms1.onrender.com/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.message === "User registered successfully") {
                    // Clear form fields after successful registration
                    setEmail('');
                    setPassword('');
                    notyf.success("Registration successful");
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                notyf.error("Registration failed, please try again.");
            });
    }

    return (
        user.id !== null 
            ? <Navigate to="/movies" />
            : (
                <Form onSubmit={registerUser}>
                    <h1 className="my-5 text-center">Register</h1>

                    <Form.Group className="my-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter Email" 
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="my-3" variant={isActive ? "primary" : "danger"} type="submit" id="submitBtn" disabled={!isActive}>
                        Submit
                    </Button>
                </Form>
            )
    );
}
