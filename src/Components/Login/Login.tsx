import s from "./Login.module.scss";
import Preloader from "../Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import {useEffect} from "react";
import {initializetSuccess} from "../../redux/app-reducer";

const Login = () => {
    const dispatch = useDispatch();
    const initialize = useSelector((state: any) => state.initialize);

    useEffect(() => {
        dispatch(initializetSuccess(true))
    }, [])


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
