import {api} from "../api/api";
import {Dispatch} from "react";

const SET_INITIALIZET = "SET_INITIALIZET"
const SET_DISABLE_BUTTON_LOGIN = "SET_DISABLE_BUTTON_LOGIN"
const SET_USER_FORM = "SET_USER_FORM"
const EXIT_ACCOUNT = "EXIT_ACCOUNT"
const SET_USERS = "SET_USERS"
const CHECK_PUBLISH_USER = "CHECK_PUBLISH_USER"


export type userFormType = {
    email: string | null
    password: string | null
}

export type usersDataType = {
    id: number | null,
    name: string,
    age: number,
    urlImg: string | null,
    work: boolean,
}[]


export type initialStateType = {
    userForm: userFormType,
    initialize: boolean,
    disabledButton: boolean,
    verification: boolean
    usersData: [] | usersDataType
    checkPublishUser: boolean,
}
let initialState: initialStateType = {
    userForm: {
        email: null,
        password: null,
    },
    initialize: false,
    disabledButton: false,
    verification: false,
    usersData: [],
    checkPublishUser: false,
}


type ActionsTypes =
    setDisabledButtonLoginType
    | initializetSuccessType
    | setUserFormType
    | exitAccountType
    | setUsersType
    | setCheckPublishUserType

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_INITIALIZET:
            return {
                ...state,
                initialize: action.initialize,
            }
        case SET_DISABLE_BUTTON_LOGIN:
            return {
                ...state,
                disabledButton: action.disabled
            }
        case EXIT_ACCOUNT:
            return {
                ...state,
                verification: false
            }
        case SET_USER_FORM:
            return {
                ...state,
                userForm: {
                    email: action.userForm.email,
                    password: action.userForm.password
                }
            }
        case SET_USERS:
            return {
                ...state,
                usersData: [...action.usersData.reverse()],
                verification: true
            }
        case CHECK_PUBLISH_USER:
            return {
                ...state,
                checkPublishUser: action.checkPublishUser
            }
        default:
            return state;
    }
}
export default appReducer;

type setDisabledButtonLoginType = {
    type: typeof SET_DISABLE_BUTTON_LOGIN,
    disabled: boolean
}
const setDisabledButtonLogin = (disabled: boolean): setDisabledButtonLoginType => {
    return {
        type: SET_DISABLE_BUTTON_LOGIN,
        disabled
    }
}


type initializetSuccessType = {
    type: typeof SET_INITIALIZET,
    initialize: boolean;
}
export const initializetSuccess = (initialize: boolean): initializetSuccessType => {
    return {
        type: SET_INITIALIZET,
        initialize
    }
}


type setUserFormType = {
    type: typeof SET_USER_FORM,
    userForm: userFormType
}
export const setUserForm = (userForm: userFormType): setUserFormType => {
    return {
        type: SET_USER_FORM,
        userForm
    }
}

type exitAccountType = {
    type: typeof EXIT_ACCOUNT,
}
export const exitAccount = (): exitAccountType => {
    return {
        type: EXIT_ACCOUNT,
    }
}

type setUsersType = {
    type: typeof SET_USERS
    usersData: usersDataType
}
const setUsers = (usersData: usersDataType): setUsersType => {
    return {
        type: SET_USERS,
        usersData
    }
}


type setCheckPublishUserType = {
    type: typeof CHECK_PUBLISH_USER,
    checkPublishUser: boolean
}
export const setCheckPublishUser = (checkPublishUser: boolean): setCheckPublishUserType => {
    return {
        type: CHECK_PUBLISH_USER,
        checkPublishUser
    }
}


export const initializeProfile = () => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(initializetSuccess(false));
        dispatch(setDisabledButtonLogin(true))
        const data = await api.getUsers('')
        if (data?.status === 200) {
            dispatch(setUsers(data.data))
            dispatch(initializetSuccess(true))
            dispatch(setDisabledButtonLogin(false))
        }
    }
}

export const searchUser = (name: string) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setDisabledButtonLogin(true))
        const data = await api.getUsers(name)
        if (data?.status === 200) {
            dispatch(setUsers(data.data))
            dispatch(setDisabledButtonLogin(false))
        }
    }
}


export const deleteUser = (id: number | null) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const data = await api.deleteUser(id)
        if (data?.status === 200) {
            const data = await api.getUsers('')
            if (data?.status === 200) {
                dispatch(setUsers(data.data))
            }
        }
    }
}


export type addedUserType = {
    id: number | null
    name: string | null
    age: number | null
    urlImg: null,
    work: boolean | null
}
export const addedUser = (userData: addedUserType) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        await api.addedUser(userData)
        const data = await api.getUsers('')
        if (data?.status === 200) {
            dispatch(setUsers(data.data))
            dispatch(setCheckPublishUser(true))
        }
    }
}


export type editUserType = {
    id: number | null,
    name: string,
    age: number,
    urlImg: string | null,
    work: boolean,
}
export const editUser = (editUser: editUserType) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        await api.editUser(editUser)
        const data = await api.getUsers('')
        if (data?.status === 200) {
            dispatch(setUsers(data.data))
            dispatch(setCheckPublishUser(true))
        }
    }
}

