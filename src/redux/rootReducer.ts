import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../actions/auth/authSlice';
import { seekerHomReducer } from '../actions/seekerHome/seekerHomeSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    seekerHome:seekerHomReducer
});

export default rootReducer;
