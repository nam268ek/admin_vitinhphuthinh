/* eslint-disable curly */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { LIST_NAME_DROPDOWN_SERVICE } from '../../constants/const';
import { getListBrandsService } from '../redux/Slices/BrandSlice';
import { getListDropdownsService } from '../redux/Slices/PrimarySlice';
import { getListTagsService } from '../redux/Slices/TagSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';

export const PrivateRoute: React.FC = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      try {
        dispatch(getListTagsService()).unwrap();
        dispatch(getListBrandsService()).unwrap();
        dispatch(getListDropdownsService({ ids: LIST_NAME_DROPDOWN_SERVICE })).unwrap();
      } catch (error) {
        openMessage(error);
      }
    }
  }, [isLogin]);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
