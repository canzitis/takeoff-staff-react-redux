import {useDispatch, useSelector} from "react-redux";
import {editUser, initialStateType} from "../../redux/app-reducer";
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import s from "./EditUserForm.module.scss";
import {useForm} from "react-hook-form";
import baseImg from '../../img/defaultImg/no_name_ava.png'
import checkEditUserImg from '../../img/checkPublishUser.png'

type setEditUserFormType = {
    setEditUserForm: (a:boolean) => void,
    editUserForm: boolean,
    idUserEdit: number | null
}


type dataType = {
    id: number | null,
    name: string,
    age: number,
    urlImg: string | null,
    work: boolean,
}

const EditUserForm: React.FC<setEditUserFormType> = ({setEditUserForm, editUserForm, idUserEdit}) => {
    const usersData = useSelector((state: initialStateType) => state.usersData);
    const editUserFormRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [checkEditUser, setCheckEditUser] = useState(false);
    const checkEditUserRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useDispatch();


    useEffect(() => {
        if (!editUserFormRef.current) return;

        if (editUserForm) {
            editUserFormRef.current.style.visibility = "visible"
            editUserFormRef.current.style.opacity = "1"
        } else {
            editUserFormRef.current.style.visibility = "hidden"
            editUserFormRef.current.style.opacity = "0"
        }
    }, [editUserForm])

    useEffect(() => {
        if (!checkEditUserRef.current) return

        if (checkEditUser) {
            checkEditUserRef.current.style.visibility = "visible"
            checkEditUserRef.current.style.opacity = "1"
        } else {
            checkEditUserRef.current.style.visibility = "hidden"
            checkEditUserRef.current.style.opacity = "0"
        }

    })

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<dataType>();

    const onSubmit = (dataEditUser: dataType) => {
        dispatch(editUser(dataEditUser))
        setCheckEditUser(true)
        setTimeout(() => {
            setEditUserForm(false)
            setCheckEditUser(false)
        }, 1500)
    };


    useEffect(() => {
        const editUserState = usersData.find((item: dataType) => {
            return item.id === idUserEdit
        })
        reset(editUserState)
    }, [idUserEdit])


    return <div className={s.container} ref={editUserFormRef}>
        {usersData.map((item: dataType) => {
            return item.id === idUserEdit &&
                <div key={item.id} className={s.editForm}>
                    <h3>Редактирование пользователя</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={s.wrapperEditFormItemsFlex}>
                            <div className={s.inputEditFormItems}>
                                <h4>Ваше фото:</h4>
                                <img src={item.urlImg ? item.urlImg : baseImg} alt="Ваше фото"/>
                            </div>

                            <div className={s.wrapperInputEditFormItemsFlex}>

                                <div className={s.inputEditFormItems}>
                                    <h4>Ваше имя:</h4>
                                    <input
                                        style={{border: errors.name && "solid 1px #E26F6F"}}
                                        type="text"
                                        {...register("name", {required: true})}
                                        minLength={2}
                                        maxLength={30}
                                        defaultValue={item.name}
                                    />
                                    {errors.name && <span className={s.errorText}>Обязательное поле</span>}
                                </div>

                                <div className={s.inputEditFormItems}>
                                    <h4>Ваш возраст:</h4>
                                    <input
                                        style={{border: errors.age && "solid 1px #E26F6F"}}
                                        type="number"
                                        min={1}
                                        max={99}
                                        {...register("age", {required: true})}
                                        defaultValue={item.age}
                                    />
                                    {errors.age && <span>Обязательное поле</span>}
                                </div>
                            </div>
                        </div>

                        <div className={s.wrapperEditFormItemsFlexTwo}>
                            <div className={s.inputEditFormItems}>
                                <h4>В поиске работы?</h4>
                                <div className={s.radioWrapper}>
                                    <input type="checkbox"  {...register("work")}
                                           defaultChecked={item.work}/>
                                    <span>Да</span>
                                </div>
                            </div>

                            <div className={s.buttonWrapper}>
                                <input
                                    type="submit"
                                />
                                <input
                                    type="reset"
                                />
                            </div>
                        </div>
                    </form>

                    <div className={s.checkEditUser} ref={checkEditUserRef}>
                        <img src={checkEditUserImg} alt="OK"/>
                        <span>Пользователь обновлен!</span>
                    </div>

                    <button className={s.buttonBack} onClick={() => {
                        setEditUserForm(false)
                    }}>Назад
                    </button>
                </div>
        })}
    </div>
}


export default EditUserForm;
