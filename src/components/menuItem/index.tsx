import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { MenuItem } from '../../models/MenuItem';
import {
  MenuButton,
  ItemName,
  ItemIcon,
} from './styles';

import assignIcon from '../../assets/images/icons/assignIcon.png';
import companyIcon from '../../assets/images/icons/companyIcon.png';
import homeIcon from '../../assets/images/icons/homeIcon.png';
import importIcon from '../../assets/images/icons/importIcon.png';
import employeesIcon from '../../assets/images/icons/employeesIcon.png';
import paymentsIcon from '../../assets/images/icons/paymentsIcon.png';
import solicitationsIcon from '../../assets/images/icons/solicitationsIcon.png';
import simultationIcon from '../../assets/images/icons/simulationIcon.png';

interface MenuItemProps {
  data: MenuItem,
  path: string,
  handlePath(path: string): void;
}

const ItemMenu: React.FC<MenuItemProps> = ({ data, path, handlePath }) => {
  const history = useHistory();
  const iconList = [
    { type: 'solicitation', dir: solicitationsIcon },
    { type: 'assign', dir: assignIcon },
    { type: 'employees', dir: employeesIcon },
    { type: 'import', dir: importIcon },
    { type: 'payments', dir: paymentsIcon },
    { type: 'home', dir: homeIcon },
    { type: 'company', dir: companyIcon },
    { type: 'simulation', dir: simultationIcon },
    { type: 'simulation', dir: simultationIcon },
  ];
  const {
    route,
    icon,
    name,
  } = data;

  const selectIcon = (iconType: string) => {
    const iconSelected = iconList.filter((item) => item.type === String(iconType));
    return iconSelected[0]?.dir || solicitationsIcon;
  };

  const navegate = useCallback((newPath) => {
    handlePath(newPath);
    history.push(newPath);
  }, [history, handlePath]);

  const isActivateMenu = useCallback(() => route === path, [path, route]);

  return (
    <MenuButton activate={isActivateMenu()}>
      <ItemIcon src={selectIcon(icon)} alt="icon" />
      <ItemName onClick={() => navegate(route)}>
        {name}
      </ItemName>
    </MenuButton>
  );
};

export default ItemMenu;
