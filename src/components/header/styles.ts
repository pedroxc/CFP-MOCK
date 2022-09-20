import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 73px;
  background: #FFFFFF;
  box-shadow: inset 0px -1px 0px #E2E2EA;
  position: relative;
`;

export const Logo = styled.img`
  position: absolute;
  left: 25px;
  top: 25px;
`;

export const ToolContainer = styled.div`
  position: absolute;
  right: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  z-index: 0;

  div {
    margin-right: 15px;
  }
`;
export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.darkBlue};
  color: white;
`;

export const UserText = styled.p`
  font-weight: 600;
  top: 4px;
  font-size: 20px;
  position: relative;
  text-transform: capitalize;
  text-align: center;
`;

export const LogoutIcon = styled.img`
  width: 30px;

  &: hover {
    cursor: pointer;
  }
`;

export const LogoutTooltip = styled.div`
  display: flex;
  align-items: center;

  svg {
    &: hover {
      cursor: pointer;
    }
  }
`;
