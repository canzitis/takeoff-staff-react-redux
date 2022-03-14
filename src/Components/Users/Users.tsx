import {useDispatch, useSelector} from "react-redux";
import s from "./Profile.module.css";
import {exitAccount, initialStateType} from "../redux/app-reducer";
import {Redirect} from "react-router"

const Users = () => {
    const email = useSelector((state: initialStateType) => state.userForm.email);
    const accessible = useSelector((state: initialStateType) => state.accessible);
    const dispatch = useDispatch();
    const clikButtonExit = () => {
        dispatch(exitAccount());
    };

    if (!accessible) {
        return <Redirect to="/login"/>
    }
    return (
        <div>
            <div className={s.header}>
                <h4>ONLI.</h4>
            </div>
            <div className={s.content}>
                <div className={s.dataUser}>
          <span>
            Здравствуйте, <h4>{email}</h4>
          </span>
                </div>
                <div className={s.exitAccountButton}>
                    <button
                        className={s.exitProfileButton}
                        onClick={() => {
                            clikButtonExit();
                        }}
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;
