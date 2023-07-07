import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store';
import { closeGlobalSearchDrawer } from '../../../store/Slices/OpenDrawerSlice';

const GlobalSearch = () => {
  const dispatch = useDispatch();

  const isOpen = useAppSelector((state) => state.drawer.isOpenGlobalSearchDrawer);
  const onClose = () => {
    dispatch(closeGlobalSearchDrawer());
  }

  
  return (
    <>
     
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={isOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default GlobalSearch;