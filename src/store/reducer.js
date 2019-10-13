import * as actionTypes from './actions/actionTypes';


const initialState = {
    users: [],
    token: null,
    loading: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOADING_USERS_FROM_API:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOADED_USERS_FROM_API:
            return {
                ...state,
                users: action.users,
                loading: false,
            }
        case actionTypes.AUTH_LOGIN_SUCCESSFULL:
            return {
                ...state,
                token: action.token
            }
        case actionTypes.NEW_USER_ADDED:
            return {
                ...state,
                users: [...state.users].push(action.users)
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...initialState
            }
        default:
            if (localStorage.getItem('token')) {
                return {
                    ...state,
                    token: localStorage.getItem('token')
                }
            } else {
                return state;
            }
    }

};

export default reducer;