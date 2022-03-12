import {api} from "../../api/api";

const SET_INITIALIZET = "SET_INITIALIZET"
const SET_DISABLE_BUTTON_LOGIN = "SET_DISABLE_BUTTON_LOGIN"

let initialState = {
    userData: null,
    userForm: {
        email: null,
        password: null,
        rememberMe: null
    },
    initialize: false,
    accessible: false,
    disabledButtonLogin: false,
    loginErrorText: null
}


const appReducer = (state = initialState, action: any) => {
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
        default:
            return state;
    }
}
export default appReducer;


const setDisabledButtonLogin = (disabled: boolean) => {
    return {
        type: SET_DISABLE_BUTTON_LOGIN,
        disabled
    }
}

export const initializetSuccess = (initialize:boolean) => {
    return {
        type: SET_INITIALIZET,
        initialize
    }
}

export const initializeProfile = () => {
    return async (dispatch:any) => {
        dispatch(setDisabledButtonLogin(true))
        dispatch(initializetSuccess(false))
        const profile = await api.getProfile()
        if (profile.status === 200) {
            dispatch(initializetSuccess(true))
        }
    }
}
