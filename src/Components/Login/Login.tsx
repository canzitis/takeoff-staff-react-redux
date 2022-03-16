import s from "./Login.module.scss";
import Preloader from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import React, {useEffect} from "react";
import {initializetSuccess, initialStateType} from "../../redux/app-reducer";
import {Navigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const initialize = useSelector((state: any) => state.initialize);
    const verification = useSelector((state: initialStateType) => state.verification);

    useEffect(() => {
        dispatch(initializetSuccess(true))
    }, [])

    if (verification) {
        return <Navigate to='/users' replace={true}/>
    }

    return (
        <div className={s.loginBlockWrapper}>
            <div className={s.loginBlock__header}>
                {!initialize && <Preloader/>}
                <h4>Login</h4>
            </div>
            <div>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;
