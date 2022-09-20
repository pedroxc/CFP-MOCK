import React, { useCallback } from 'react';
import ReactTooltip from 'react-tooltip';

import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import theme from '../../styles/themes/dark';
import {
  Container,
  Logo,
  UserAvatar,
  UserText,
  LogoutTooltip,
  ToolContainer,
} from './styles';
import brandLogo from '../../assets/images/Logo.png';
import CompanyFilter from '../companyFilter';

const Header: React.FC = () => {
  const { userEmail } = useAuth();

  const logout = useCallback(() => {
    window.localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <Container>
      <Logo src={brandLogo} alt="brandlogo" />
      <ToolContainer>
        <CompanyFilter />
        <UserAvatar>
          <UserText
            data-background-color={theme.colors.darkBlue}
            data-tip={userEmail}
            data-place="bottom"
            data-type="dark"
            data-effect="solid"
            data-text-color="white"
          >
            {userEmail[0]}
          </UserText>
        </UserAvatar>
        <LogoutTooltip
          data-background-color={theme.colors.auxPrimary}
          data-tip="Sair"
          data-place="bottom"
          data-type="light"
          data-effect="solid"
          data-text-color="white"
          onClick={() => logout()}
        >
          <FiLogOut size={30} color={theme.colors.darkBlue} />
        </LogoutTooltip>
      </ToolContainer>
      <ReactTooltip />
    </Container>
  );
};

export default Header;
