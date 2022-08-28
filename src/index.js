import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './contexts/user-context';
import { initializeFirebase } from './firebase';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './Router';

initializeFirebase();

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <Router />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
