import React, {MutableRefObject, useEffect, useRef} from "react";
import s from './Added.User.module.scss'
import {useForm} from "react-hook-form";
import {addedUser, usersDataType} from "../../redux/app-reducer";
import {useDispatch} from "react-redux";


type AddedUserType = {
    modeAddedUser: boolean
    setModeAddedUser: any
}

const AddedUser: React.FC<AddedUserType> = ({modeAddedUser, setModeAddedUser}) => {
    const addedUserWindow = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit: any = (data: usersDataType) => {
        console.log(data)
        dispatch(addedUser(data))
    };

    useEffect(() => {
        if (!addedUserWindow.current) return;

        if (modeAddedUser) {
            addedUserWindow.current.style.visibility = "visible"
            addedUserWindow.current.style.opacity = "1"
        } else {
            addedUserWindow.current.style.visibility = "hidden"
            addedUserWindow.current.style.opacity = "0"
        }
    }, [modeAddedUser])


    return <div ref={addedUserWindow} className={s.container}>
        <h3>Добавить пользователя</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={s.wrapperInputFormItems}>
            <div className={s.inputFormItems}>
                <h4>Ваше имя и фамилия:</h4>
                <input
                    style={{border: errors.name && "solid 1px #E26F6F"}}
                    type="text"
                    {...register("name", {required: true})}
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
                />
                {errors.age && <span>Обязательное поле</span>}
            </div>


            <div className={s.inputFormItems__file}>
                <h4>Ваше фото:</h4>
                <input
                    style={{border: errors.file && "solid 1px #E26F6F"}}
                    type="file"
                    {...register("urlImg", {required: true})}
                />
            </div>


            <div className={s.inputFormItems__radio}>
                <h4>Работаете?</h4>
                <div className={s.radioWrapper}>
                    <input type="checkbox"  {...register("work")} />
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
        <button className={s.buttonClose} onClick={() => {
            setModeAddedUser(false)
        }}>Закрыть окно
        </button>
    </div>
}

export default AddedUser;
