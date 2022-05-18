import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    action: "",
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
        setAction: (state: any, action: any) => {
            state.action = action.payload;
        },
        setIsLoading: (state: any, action: any) => {
            state.isLoading = action.payload;
        }
    },
  });

const { reducer } = primarySlice;
export const { setIsLoading, setAction } = primarySlice.actions;
export default reducer;