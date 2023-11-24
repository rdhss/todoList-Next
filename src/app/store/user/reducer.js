import { LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "../constant"

const initialState = {
    loading : false,
    data : [],
    error : ''    
}


const UserReducer= (state = initialState, action) => {
    const _actions = {
        [LOGIN_USER_REQUEST] : () => {
            return {
                ...state,
                loading : true
            }
        },
        [LOGIN_USER_SUCCESS] : () => {
            return {
                loading : false,
                data : action.payload,
            }
        },
        [LOGIN_USER_FAILED] : () => {
            return {
                loading : false,
                data : [],
                error : action.payload
            }
        },
        DEFAULT: () =>state,
    }
    return (_actions[action.type] || _actions.DEFAULT)()
}

export default UserReducer