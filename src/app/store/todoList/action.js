import axios from 'axios'
import { GET_TODO_SUCCESS, GET_TODO_FAILED, GET_TODO_REQUEST } from '../constant'

const fetchingTodoRequest = () => {
    return {
        type: GET_TODO_REQUEST
    }
}

const fetchingTodoSucess = (data) => {
    return {
        type: GET_TODO_SUCCESS,
        payload: data
    }
}

const fetchingTodoFailed = (err) => {
    return {
        type: GET_TODO_FAILED,
        payload: err
    }
}


export const fethingTodo = () => {
    return (dispatch) => {
        dispatch(fetchingTodoRequest);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}task`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) =>{dispatch(fetchingTodoSucess(res.data))})
            .catch((err) => dispatch(fetchingTodoFailed(err.response.data.errors)))
    }
}


export const fethingTodoPost = (payload) => {
    return (dispatch) => {
        dispatch(fetchingTodoRequest);
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}task`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => dispatch(fethingTodo()))
            .catch((err) => dispatch(fetchingTodoFailed(err.response.data.errors)))
    }
}

export const fethingTodoEdit = (payload) => {
    return (dispatch) => {
        dispatch(fetchingTodoRequest);
        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}task/${payload.id}`, payload.data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => dispatch(fethingTodo()))
            .catch((err) => dispatch(fetchingTodoFailed(err.response.data.errors)))
    }
}

export const fethingTodoDelete = (payload) => {
    return (dispatch) => {
        dispatch(fetchingTodoRequest);
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}task/${payload}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) =>{console.log(res); dispatch(fethingTodo())})
            .catch((err) => {console.log(err); dispatch(fetchingTodoFailed(err.response.data.errors))})
    }
}

