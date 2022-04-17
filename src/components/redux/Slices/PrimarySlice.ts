import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: "",
    showSidebarCategories: false,
    showSidebarMenu: false,
    isLoading: false,
    showSearchArea: true,
    showOrHideDropdownCart: false,
    showSidebarFilter: false
};

const primaryReducer = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
  });


export default primaryReducer;