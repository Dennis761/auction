import * as actionType from '../Constants/LoginConstants.js';

export const loginReducer = (state = { loginData: {}, error: null }, action) => {
    switch (action.type) {
        case actionType.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginData: action.payload.loginData,
                error: null
            };
        case actionType.LOGIN_USER_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case actionType.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const createNewUserReducer = (state = { userData: {}, error: null}, action) => {
    switch (action.type) {
        case actionType.CREATE_USER_SUCCESS:
            return {
                ...state,
                userData: action.payload.userData,
                error: null
            }
        case actionType.CREATE_USER_ERROR:
            return {
                ...state,
                error: action.payload.error.errors
            };
        case actionType.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
        }
}