import {useDispatch, useSelector} from "react-redux";
import s from "./Users.module.scss";
import {deleteUser, exitAccount, initialStateType} from "../../redux/app-reducer";
import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import baseImg from '../../img/defaultImg/no_name_ava.png'
import Search from "../SearchUsers/SearchUsers";
import AddedUser from "../AddedUser/AddedUser";
import EditUserForm from "../EditUser/EditUserForm";


type dataType = {
    id: number | null,
    name: string,
    age: number,
    urlImg: string | null,
    work: boolean,
}


const Users = () => {
    const email = useSelector((state: initialStateType) => state.userForm.email);
    const verification = useSelector((state: initialStateType) => state.verification);
    const usersData = useSelector((state: initialStateType) => state.usersData);

    const dispatch = useDispatch();
    const [modeAddedUser, setModeAddedUser] = useState(false)
    const [editUserForm, setEditUserForm] = useState(false)
    const [idUserEdit, setIdUserEdit] = useState<number | null>(null)

    const clickButtonExit = () => {
        dispatch(exitAccount());
    };

    const clickDeleteUser = (id: number | null) => {
        dispatch(deleteUser(id))
    }

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

                <div className={s.search}>
                    <Search/>
                </div>

                <div className={s.addedUserButton}>
                    <button onClick={() => {
                        setModeAddedUser(true)
                    }}>Добавить пользователя
                    </button>
                </div>

                <AddedUser modeAddedUser={modeAddedUser} setModeAddedUser={setModeAddedUser}/>

                <div className={s.usersWrapper}>
                    {usersData.map((item: dataType) => {
                        return <div key={item.id} className={s.usersItem}>
                            <img src={item.urlImg ? item.urlImg : baseImg} alt=""/>
                            <h4>{item.name}</h4>
                            <div className={s.usersItem__age}>Мой возраст: <span>{item.age}</span></div>
                            <div className={s.usersItem__work}>В поиске работы: <span>{item.work ? "Да" : "Нет"}</span>
                            </div>
                            <div className={s.buttonWrapper}>
                                <button onClick={() => {
                                    setIdUserEdit(item.id)
                                    setEditUserForm(true)
                                }}>Редактировать
                                </button>
                                <button onClick={() => {
                                    clickDeleteUser(item.id)
                                }}>Удалить
                                </button>
                            </div>
                        </div>
                    })}
                </div>

                <EditUserForm editUserForm={editUserForm} setEditUserForm={setEditUserForm} idUserEdit={idUserEdit}/>

                <div className={s.exitAccountButton}>
                    <button
                        className={s.exitProfileButton}
                        onClick={() => {
                            clickButtonExit();
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
