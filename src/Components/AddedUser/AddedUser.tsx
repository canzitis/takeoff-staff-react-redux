import React, {MutableRefObject, useEffect, useRef} from "react";
import s from './Added.User.module.scss'
import {useForm} from "react-hook-form";
import {addedUser, initialStateType, setCheckPublishUser} from "../../redux/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import checkPublishUserImg from '../../img/checkPublishUser.png'


type AddedUserType = {
    modeAddedUser: boolean
    setModeAddedUser: (a: boolean) => void
}
export type dataType = {
    id: number | null
    name: string | null
    age: number | null
    urlImg: null,
    work: boolean | null
}
const AddedUser: React.FC<AddedUserType> = ({modeAddedUser, setModeAddedUser}) => {
    const checkPublishUser = useSelector((state: initialStateType) => state.checkPublishUser);
    const dispatch = useDispatch();
    const addedUserWindow = useRef() as MutableRefObject<HTMLDivElement>;
    const checkPublishUserBlock = useRef() as MutableRefObject<HTMLDivElement>;


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


    useEffect(() => {
        if (!checkPublishUserBlock.current) return;

        if (checkPublishUser) {
            checkPublishUserBlock.current.style.visibility = "visible"
            checkPublishUserBlock.current.style.opacity = "1"
            setTimeout(() => {
                dispatch(setCheckPublishUser(false))
            }, 1500)
        } else {
            checkPublishUserBlock.current.style.visibility = "hidden"
            checkPublishUserBlock.current.style.opacity = "0"
        }
    }, [checkPublishUser])


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<dataType>();

    const onSubmit = (data: dataType) => {
        dispatch(addedUser({
            id: null,
            name: data.name,
            age: Number(data.age),
            //TODO:?????????? ???????????????? ????????, ??.??. json-server ???? ?????????? ???????????????? ?? ?????????????????? ????????????.
            urlImg: null,
            work: data.work
        }))
        reset({
            id: null,
            name: '',
            age: null,
            urlImg: null,
            work: null
        })
        setTimeout(() => {
            setModeAddedUser(false)
        }, 2000)
    };

    return <div ref={addedUserWindow} className={s.container}>
        <div className={s.addedUserWindow}>
            <h3>???????????????? ????????????????????????</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={s.wrapperInputFormItems}>
                <div className={s.inputFormItems}>
                    <h4>???????? ?????? ?? ??????????????:</h4>
                    <input
                        style={{border: errors.name && "solid 1px #E26F6F"}}
                        type="text"
                        {...register("name", {required: true})}
                        minLength={2}
                        maxLength={30}
                    />
                    {errors.name && <span className={s.errorText}>???????????????????????? ????????</span>}
                </div>


                <div className={s.inputFormItemsAge}>
                    <h4>?????? ??????????????:</h4>
                    <input
                        style={{border: errors.age && "solid 1px #E26F6F"}}
                        type="number"
                        min={1}
                        max={99}
                        {...register("age", {required: true})}
                    />
                    {errors.age && <span>???????????????????????? ????????</span>}
                </div>


                <div className={s.inputFormItems__file}>
                    <h4>???????? ????????:</h4>
                    {/*TODO:?????????? ???????????????? ????????, ??.??. json-server ???? ?????????? ???????????????? ?? ?????????????????? ????????????.}*/}
                    {/*<input
                    style={{border: errors.file && "solid 1px #E26F6F"}}
                    type="file"
                    defaultValue={undefined}
                    {...register("urlImg")}
                />*/}
                    <span>?????? ???????????? ???????? ???????????????? ????????</span>
                </div>


                <div className={s.inputFormItems__radio}>
                    <h4>?? ???????????? ?????????????</h4>
                    <div className={s.radioWrapper}>
                        <input type="checkbox"  {...register("work")} />
                        <span>????</span>
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
            </form>

            <div ref={checkPublishUserBlock} className={s.checkPublishUser}>
                <img src={checkPublishUserImg} alt="checkPublishUser"/>
                <span>???????????????????????? ????????????????!</span>
            </div>

            <button className={s.buttonClose} onClick={() => {
                setModeAddedUser(false)
            }}>?????????????? ????????
            </button>
        </div>
    </div>
}

export default AddedUser;
