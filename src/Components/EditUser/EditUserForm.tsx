import {useSelector} from "react-redux";
import {addedUser, initialStateType, usersDataType} from "../../redux/app-reducer";
import React, {MutableRefObject, useEffect, useRef} from "react";
import s from "./EditUserForm.module.scss";
import {useForm} from "react-hook-form";

type setEditUserFormType = {
    setEditUserForm: any,
    editUserForm: boolean,
    idUserEdit: number | null
}

const EditUserForm: React.FC<setEditUserFormType> = ({setEditUserForm, editUserForm, idUserEdit}) => {
    const usersData = useSelector((state: initialStateType) => state.usersData);
    const editUserFormRef = useRef() as MutableRefObject<HTMLDivElement>;


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

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const onSubmit: any = (data: usersDataType) => {


        setEditUserForm(false)
    };


    const test = () => {
        setEditUserForm(false)
        reset({
            id: null,
            name: '',
            age: null,
            urlImg: null,
            work: null
        })
    }

  /*  useEffect(() => {
        reset({
            id: null,
            name: '',
            age: null,
            urlImg: null,
            work: null
        })
    }, [reset])*/


    return <div className={s.container} ref={editUserFormRef}>
        {usersData.map((item: usersDataType) => {
            return item.id === idUserEdit &&
                <div key={item.id}>
                    <h3>Редактирование пользователя</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className={s.inputFormItems__file}>
                            <h4>Ваше фото:</h4>
                            <img src="" alt="Ваше фото"/>
                            <input
                                style={{border: errors.file && "solid 1px #E26F6F"}}
                                type="file"
                                {...register("urlImg")}
                            />
                        </div>

                        <div className={s.inputFormItems}>
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

                        <div className={s.inputFormItemsAge}>
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

                        <div className={s.inputFormItems__radio}>
                            <h4>В поиске работы?</h4>
                            <div className={s.radioWrapper}>
                                <input type="checkbox"  {...register("work")}
                                       defaultChecked={item.work}/>
                                <span>Да</span>
                            </div>
                        </div>

                        <div className={s.buttonWrapper}>
                            <input
                                className={s.buttonSend}
                                type="submit"
                            />
                            <input
                                className={s.buttonReset}
                                type="reset"
                            />
                        </div>
                    </form>

                    <button className={s.buttonBack} onClick={() => {
                        setEditUserForm(false)
                    }}>Назад
                    </button>
                </div>
        })}
    </div>
}


export default EditUserForm;
