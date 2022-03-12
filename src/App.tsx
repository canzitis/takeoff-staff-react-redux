import React from 'react';
import './App.css';
import Login from "./Components/Login/Login";
import {Route} from 'react-router';
import Users from "./Components/Users/Users";
import { Routes } from 'react-router-dom';

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path='/login' element={<Login/>}>
                </Route>
                <Route path='/users' element={<Users/>}>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
