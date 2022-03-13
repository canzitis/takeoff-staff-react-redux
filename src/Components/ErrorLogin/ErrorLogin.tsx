import { useSelector} from "react-redux";
import s from "./ErrorLogin.module.scss";




const ErrorLogin = () => {
    const email = useSelector((state:any) => state.userForm.email);
    return (
        <div className={s.errorLoginWrapper}>
            <div className={s.errorLogin__img}>!</div>
            <span>Пользователя {email} не существует</span>
        </div>
    );
};

export default ErrorLogin;
