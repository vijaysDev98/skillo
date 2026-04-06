import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    isBtnLoading: false,
    services: [],
    searchListData: [],
    serviceCategoryList:[],
    serviceCategoryData:[],
};

export const seekerHomeSlice = createSlice({
    name: 'seekerHome',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setBtnLoading: (state, { payload }) => {
            state.isBtnLoading = payload;
        },
        setServices: (state, { payload }) => {
            state.services = payload;
        },
        setSearchList: (state, { payload }) => {
            state.searchListData = payload;
        },
        setServiceCategoryList: (state, { payload }) => {
            state.serviceCategoryList = payload;
        },
        setServiceCategoryData: (state, { payload }) => {
            state.serviceCategoryData = payload;
        },
        resetSeekerHome: () => initialState,
    },
});

export const { 
    setLoading, 
    setBtnLoading, 
    setServices, 
    setSearchList, 
    setServiceCategoryList, 
    setServiceCategoryData,
    resetSeekerHome 
}: any = seekerHomeSlice.actions;

export const seekerHomReducer = seekerHomeSlice.reducer;
