import {useDispatch, useSelector} from "react-redux";
import s from "./Users.module.scss";
import {exitAccount, initialStateType} from "../../redux/app-reducer";
import {Navigate} from "react-router-dom";


const Users = () => {
    const email = useSelector((state: initialStateType) => state.userForm.email);
    const verification = useSelector((state: initialStateType) => state.verification);
    const dispatch = useDispatch();

    const clikButtonExit = () => {
        dispatch(exitAccount());
    };

    if (!verification) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            <div className={s.header}>
                <h4>Users</h4>
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
