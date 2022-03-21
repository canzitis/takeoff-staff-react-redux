import React, {useEffect, useRef} from "react";
import s from './Added.User.module.scss'


type AddedUserType = {
    addedUser: boolean
}


const AddedUser: React.FC<AddedUserType> = ({addedUser}) => {

    const addedUserWindow: any = useRef(null);

    useEffect(() => {
        if (!addedUserWindow.current) return;

        if (addedUser) {
            addedUserWindow.current.style.visibility = "visible"
        }
    }, [addedUser])


    return <div ref={addedUserWindow} className={s.container}>
        <h4>Добавить пользователя</h4>
        <div>
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
        </div>
    </div>
}

export default AddedUser;