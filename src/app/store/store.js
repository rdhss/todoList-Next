import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slice'
import TodoReducer from './todoList/reducer'
import UserReducer from './user/reducer'


export const store = configureStore({
  reducer: {
    todo : TodoReducer,
    user : UserReducer
  },
})