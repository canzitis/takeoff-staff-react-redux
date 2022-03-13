import {api} from "../../api/api";

const SET_INITIALIZET = "SET_INITIALIZET"
const SET_DISABLE_BUTTON_LOGIN = "SET_DISABLE_BUTTON_LOGIN"
const SET_PROFILE = "SET_PROFILE"
const SET_USER_FORM = "SET_USER_FORM"


export type userFormType = {
    email: string | null
    password: string | null
}


type userDataType = {
    email: string
    password: string
}

type initialStateType = {
    userData: userDataType | null,
    userForm: userFormType,
    initialize: boolean,
    accessible: boolean,
    disabledButtonLogin: boolean,
    loginErrorText: boolean | null
}


let initialState = {
    userData: null,
    userForm: {
        email: null,
        password: null,
    },
    initialize: false,
    accessible: false,
    disabledButtonLogin: false,
    loginErrorText: null
}


const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action) {
        case SET_INITIALIZET:
            return {
                ...state,
                initialize: action.initialize
            }
        case SET_DISABLE_BUTTON_LOGIN:
            return {
                ...state,
                disabledButtonLogin: action.disabled
            }
        case SET_PROFILE:
            return {
                ...state,
                userData: {
                    email: action.userData.email,
                    password: action.userData.password,
                },
                initialize: true,
                disabledButtonLogin: false
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


type setProfileType = {
    type: typeof SET_PROFILE,
    profile: userDataType
}

export const setProfile = (profile: userDataType): setProfileType => {
    return {
        type: SET_PROFILE,
        profile
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

export const initializeProfile = () => {
    return async (dispatch: any) => {
        dispatch(setDisabledButtonLogin(true))
        dispatch(initializetSuccess(false))
        const profile = await api.getProfile()
        if (profile.status === 200) {
            dispatch(setProfile(profile.userData))
            dispatch(initializetSuccess(true))
        }
    }
}
