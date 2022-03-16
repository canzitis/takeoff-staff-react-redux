import {useDispatch, useSelector} from "react-redux";
import s from "./Users.module.scss";
import {exitAccount, initialStateType, usersDataType} from "../../redux/app-reducer";
import React from "react";
import {Navigate} from "react-router-dom";


const Users = () => {
    const email = useSelector((state: initialStateType) => state.userForm.email);
    const verification = useSelector((state: initialStateType) => state.verification);
    const usersData = useSelector((state: initialStateType) => state.usersData);
    const dispatch = useDispatch();

    const clikButtonExit = () => {
        dispatch(exitAccount());
    };

    if (!verification) {
        return <Navigate to='/login' replace={true}/>
    }

    return (
        <>
            <div className={s.header}>
                <h4>Users</h4>
            </div>
            <div className={s.content}>
                <div className={s.dataUser}>
                    <h4>Здравствуйте, <span>{email}</span></h4>
                </div>

                <div className={s.usersWrapper}>
                    {usersData.map((item: usersDataType) => {
                        return <div className={s.usersItem}>
                            <img src={item.urlImg} alt=""/>
                            <h4>{item.name ? item.name : "нет аватарки"}</h4>
                            <div>Мой возраст: <span>{item.age}</span></div>
                            <div>В поиске работы: {item.work ? "Да" : "Нет"}</div>
                        </div>
                    })}
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
        </>
    );
};

export default Users;
