import React from 'react';
import './App.css';
import Login from "./Components/Login/Login";
import {Route} from 'react-router';
import Users from "./Components/Users/Users";
import {Navigate, Routes} from 'react-router-dom';
import {useSelector} from "react-redux";
import {initialStateType} from "./redux/app-reducer";

function App() {

    const verification = useSelector((state: initialStateType) => state.verification);

    if (verification) {
        console.log(verification)

    }
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Navigate to="/users"/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/users' element={<Users/>}/>
            </Routes>
        </div>
    );
}

export default App;
