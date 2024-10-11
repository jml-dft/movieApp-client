import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Container from 'react-bootstrap/Container';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import MovieView from './pages/MovieView';
import Logout from './pages/Logout';
import Error from './pages/Error';

function App() {
    const [user, setUser] = useState({
        id: null,
        isAdmin: null,
    });

    // Function for clearing localStorage on logout
    const unsetUser = () => {
        localStorage.clear();
    };

    // Fetch user details and set user state on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://movieapp-api-lms1.onrender.com/users/details`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();

                if (data.auth !== "Failed") {
                    setUser({
                        id: data._id,
                        isAdmin: data.isAdmin,
                    });
                } else {
                    setUser({
                        id: null,
                        isAdmin: null,
                    });
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    // Log user state and localStorage for debugging
    useEffect(() => {
        console.log('User state:', user);
        console.log('LocalStorage:', localStorage);
    }, [user]);

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <AppNavbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/movies/:movieId" element={<MovieView />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
