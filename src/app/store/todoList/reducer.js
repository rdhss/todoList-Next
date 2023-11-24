import { GET_TODO_FAILED, GET_TODO_REQUEST, GET_TODO_SUCCESS } from "../constant"

const initialState = {
    loading : false,
    data : [],
    error : ''    
}


const TodoReducer= (state = initialState, action) => {
    const _actions = {
        [GET_TODO_REQUEST] : () => {
            return {
                ...state,
                loading : true
            }
        },
        [GET_TODO_SUCCESS] : () => {
            return {
                loading : false,
                data : action.payload,
            }
        },
        [GET_TODO_FAILED] : () => {
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

export default TodoReducer