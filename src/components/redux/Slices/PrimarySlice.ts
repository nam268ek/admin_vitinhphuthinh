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

const primarySlice = createSlice({
    name: 'primary',
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

const { reducer } = primarySlice;
export const { setIsLoading } = primarySlice.actions;
export default reducer;