import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import s from "./SearchUsers.module.scss";
import dangerSrc from '../../img/danger.png'
import {initialStateType, searchUser} from "../../redux/app-reducer";

type dataType = {
    search: string
}
const Search = () => {
    const disabledButton = useSelector((state: initialStateType) => state.disabledButton);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<dataType>();

    const onSubmit = (name: dataType) => {
        dispatch(searchUser(name.search))
    };

    const resetSearch = () => {
        dispatch(searchUser(''))
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.searchWrapper}>
                <div className={s.inputSearch}>
                    <input
                        placeholder="Введите имя или фамилию для поиска"
                        style={{border: errors.search && "solid 1px #E26F6F"}}
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
                    disabled={disabledButton}
                    value=""
                />
                <input
                    className={s.buttonSearchReset}
                    type="reset"
                    value=""
                    onClick={() => {
                        resetSearch()
                    }}
                />
            </div>
            {errors?.search &&
                <div className={s.errorText}><img src={dangerSrc} alt=""/><span>Поле обязательно к заполнению!</span>
                </div>}
        </form>
    );
};

export default Search;
