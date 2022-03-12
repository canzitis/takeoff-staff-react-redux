import s from "./Login.module.css";
import Preloader from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import {useEffect} from "react";
import ErrorLogin from "../ErrorLogin/ErrorLogin";
import {initializeProfile} from "../redux/app-reducer";

const Login = () => {
    const dispatch = useDispatch();
    const initialize = useSelector((state:any) => state.initialize);
    const loginErrorText = useSelector((state:any) => state.loginErrorText);


    useEffect(() => {
        dispatch(initializeProfile())
    })

    return (
        <div className={s.loginBlock}>
            <div className={s.header}>
               {/* {!initialize && <Preloader/>}*/}
                <h4>Login</h4>
            </div>
            <div className="content">
                {loginErrorText && <ErrorLogin/>}
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;
