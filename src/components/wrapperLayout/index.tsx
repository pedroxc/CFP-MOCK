import React, { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';

import Header from '../header';
import SideMenu from '../sideMenu';
import { MainView } from './styles';

const Layout: React.FC = ({ children }) => {
  const { menuItems, userToken } = useAuth();

  const isLogged = useCallback(() => (menuItems && !!userToken),
    [menuItems, userToken]);

  return (
    <>
      {isLogged() && <Header />}
      <MainView>
        {isLogged() && <SideMenu />}
        {children}
      </MainView>
    </>
  );
};

export default Layout;
