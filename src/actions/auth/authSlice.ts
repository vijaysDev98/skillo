import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  userData: undefined,
  cityList: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setBtnLoading: (state, { payload }) => {
      state.isBtnLoading = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    resetAuth: () => initialState, 
  },
});

export const { setLoading, setBtnLoading, setUserData, resetAuth }: any = authSlice.actions;

export const authReducer = authSlice.reducer;
