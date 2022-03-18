import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import s from "./SearchUsers.module.scss";
import dangerSrc from '../../img/danger.png'
import any = jasmine.any;

type minLengthType = {
    value: number,
    message: string
}

const Search = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (searchData: any) => {
        /*dispatch(initializedSuccess(null));
        dispatch(setDataUserForm(data));
        dispatch(initializeProfile());*/
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.searchWrapper}>
                <div className={s.inputSearch}>
                    <input
                        style={{border: errors.input && "solid 1px #E26F6F"}}
                        {...register("search",
                            {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 3 символа'
                                }
                            })}
                    />
                </div>
                <input
                    className={s.buttonSend}
                    type="submit"
                    /*disabled={disabledButtonLogin}*/
                />
            </div>
            {errors?.search &&
                <div className={s.errorText}><img src={dangerSrc} alt=""/><span>Поле обязательно к заполнению!</span>
                </div>}
        </form>
    );
};

export default Search;
