import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {
    initializeProfile, initialStateType,
    setUserForm, userFormType
} from "../../redux/app-reducer";
import s from "./LoginForm.module.scss";

type dataType = {
    email: string,
    password: string,
    checkbox: boolean
}

const LoginForm = () => {
    const disabledButton = useSelector((state: initialStateType) => state.disabledButton);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<dataType>();

    const onSubmit = (data: userFormType) => {
        dispatch(setUserForm(data));
        dispatch(initializeProfile());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.inputForma}>
                <h4>Логин</h4>
                <input
                    style={{border: errors.email && "solid 1px #E26F6F"}}
                    type="email"
                    {...register("email", {required: true})}
                />
                {errors.email && <span className={s.errorText}>Обязательное поле</span>}
            </div>
            <div className={s.inputForma}>
                <h4>Пароль</h4>
                <input
                    style={{border: errors.password && "solid 1px #E26F6F"}}
                    type="password"
                    {...register("password", {required: true})}
                />
                {errors.password && <span>Обязательное поле</span>}
            </div>
            <div className={s.inputChekbox}>
                <input type="checkbox" {...register("checkbox")} />
                <label htmlFor="">Запомнить меня</label>
            </div>
            <input
                className={s.buttonSend}
                type="submit"
                disabled={disabledButton}
            />
        </form>
    );
};

export default LoginForm;
