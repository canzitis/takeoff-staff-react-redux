import s from "./Login.module.scss";
import Preloader from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import {useEffect} from "react";
import ErrorLogin from "../ErrorLogin/ErrorLogin";
import {initializeProfile} from "../redux/app-reducer";

const Login = () => {
    const dispatch = useDispatch();
    const initialize = useSelector((state: any) => state.initialize);
    const loginErrorText = useSelector((state: any) => state.loginErrorText);


    useEffect(() => {
        dispatch(initializeProfile())
    })

    return (
        <div className={s.loginBlockWrapper}>
            <div className={s.loginBlock__header}>
                {initialize && <Preloader/>}
                <h4>Login</h4>
            </div>
            <div>
                {loginErrorText && <ErrorLogin/>}
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;
