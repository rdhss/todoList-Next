import axios from 'axios'
import { LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from '../constant'

const fetchingUserRequest = () => {
    return {
        type: LOGIN_USER_REQUEST
    }
}

const fetchingUserSucess = (data) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data
    }
}

const fetchingUserFailed = (err) => {
    return {
        type: LOGIN_USER_FAILED,
        payload: err
    }
}

export const fethingLogin = (payload) => {
    return (dispatch) => {
        dispatch(fetchingUserRequest);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/signin`, payload)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                dispatch(fetchingUserSucess(res.data))
            })
            .catch((err) => dispatch(fetchingUserFailed(err.response.data.errors)))
    }
}

