import React from 'react';
import { Outlet } from 'react-router-dom';
import ErrorDialog from './components/ErrorDialog';
import TopBar from './components/TopBar';
import LeftMenu from './components/LeftMenu';

function Layout() {
  return (
    <React.Fragment>
      <TopBar />
      <Outlet />
      <LeftMenu />
      <ErrorDialog />
    </React.Fragment>
  );
}

export default Layout;
