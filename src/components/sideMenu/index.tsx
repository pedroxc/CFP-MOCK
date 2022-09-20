import React, { useState } from 'react';

import { useAuth } from '../../hooks/auth';
import ItemMenu from '../menuItem';
import { MenuItem } from '../../models/MenuItem';
import { Container, GridItems } from './styles';

const SideMenu: React.FC = () => {
  const { menuItems } = useAuth();
  const [pathSelected, setPathSelected] = useState('/home');

  return (
    <Container>
      <GridItems>
        {menuItems?.map((item: MenuItem) => (
          <ItemMenu
            key={item.id}
            data={item}
            path={pathSelected}
            handlePath={(path) => setPathSelected(path)}
          />
        ))}
      </GridItems>
    </Container>
  );
};

export default SideMenu;
