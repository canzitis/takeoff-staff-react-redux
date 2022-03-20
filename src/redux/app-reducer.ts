import {api} from "../api/api";

const SET_INITIALIZET = "SET_INITIALIZET"
const SET_DISABLE_BUTTON_LOGIN = "SET_DISABLE_BUTTON_LOGIN"
const SET_USER_FORM = "SET_USER_FORM"
const USER_VERIFICATION = "USER_VERIFICATION"
const EXIT_ACCOUNT = "EXIT_ACCOUNT"
const SET_USERS = "SET_USERS"


export type userFormType = {
    email: string | null
    password: string | null
}
export type usersDataType = {
    id: number,
    name: string,
    age: number,
    urlImg: string,
    work: boolean
}
export type initialStateType = {
    userForm: any,
    initialize: boolean,
    disabledButton: boolean,
    verification: boolean
    usersData: any
}


let initialState = {
    userForm: {
        email: null,
        password: null,
    },
    initialize: false,
    disabledButton: false,
    verification: false,
    usersData: [],
}


const appReducer = (state = initialState, action: any): initialStateType => {
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
        case USER_VERIFICATION:
            return {
                ...state,
                verification: action.verification
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
                usersData: [...action.users],
                verification: true
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
    users: usersDataType
}
const setUsers = (users: usersDataType): setUsersType => {
    return {
        type: SET_USERS,
        users
    }
}


export const initializeProfile = () => {
    return async (dispatch: any) => {
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
    return async (dispatch: any) => {
        dispatch(setDisabledButtonLogin(true))
        const data = await api.getUsers(name)
        if (data?.status === 200) {
            dispatch(setUsers(data.data))
            dispatch(setDisabledButtonLogin(false))
        }
    }
}


export const deleteUser = (id: number) => {
    return async (dispatch: any) => {
        debugger
        const data = await api.deleteUser(id)
        if (data?.status === 200) {
            const data = await api.getUsers('')
            if (data?.status === 200) {
                dispatch(setUsers(data.data))
            }
        }
    }
}


