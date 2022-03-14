import {api} from "../../api/api";

const SET_INITIALIZET = "SET_INITIALIZET"
const SET_DISABLE_BUTTON_LOGIN = "SET_DISABLE_BUTTON_LOGIN"
const SET_USER_FORM = "SET_USER_FORM"
const USER_VERIFICATION = "USER_VERIFICATION"
const EXIT_ACCOUNT = "EXIT_ACCOUNT"


export type userFormType = {
    email: string | null
    password: string | null
}


export type initialStateType = {
    userForm: userFormType,
    initialize: boolean,
    accessible: boolean,
    disabledButtonLogin: boolean,
    loginErrorText: boolean | null,
    verification: boolean
}


let initialState = {
    userForm: {
        email: null,
        password: null,
    },
    initialize: false,
    accessible: false,
    disabledButtonLogin: false,
    loginErrorText: null,
    verification: false,
}


const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action) {
        case SET_INITIALIZET:
            return {
                ...state,
                initialize: action.initialize,
                accessible: true
            }
        case SET_DISABLE_BUTTON_LOGIN:
            return {
                ...state,
                disabledButtonLogin: action.disabled
            }
        case EXIT_ACCOUNT:
            return {
                ...state,
                accessible: false
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


type userVerificationType = {
    type: typeof USER_VERIFICATION,
    verification: boolean
}
export const userVerification = (verification: boolean): userVerificationType => {
    return {
        type: USER_VERIFICATION,
        verification
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

export const initializeProfile = () => {
    return async (dispatch: any) => {
        dispatch(initializetSuccess(false));
        dispatch(setDisabledButtonLogin(true))
        const profile = await api.getProfile()
        if (profile.status === 200) {
            dispatch(initializetSuccess(true))
            dispatch(setDisabledButtonLogin(false))
            dispatch(userVerification(true))
        }
    }
}
