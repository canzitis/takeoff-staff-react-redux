import React from 'react';
import './App.css';
import Login from "./Components/Login/Login";
import Users from "./Components/Users/Users";
import {Navigate, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Navigate to="/users" replace={true}/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/users' element={<Users/>}/>
            </Routes>
        </div>
    );
}

export default App;
