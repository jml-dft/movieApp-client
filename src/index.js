import React from 'react';
import ReactDOM from 'react-dom/client';
// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.js';
import './index.css'
import 'notyf/notyf.min.css';

//the "import" statement allows us to use the code/exported modules from other files similar to how we use the "require" function in NODE JS.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <App />
 
);