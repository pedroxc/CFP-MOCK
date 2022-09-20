import styled from 'styled-components';

interface MenuBtnProps {
  activate: boolean;
}

export const MenuButton = styled.button<MenuBtnProps>`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  margin-top: 10px;
  padding-left: 15px;

  ${(props) => {
    if (props.activate) {
      return `
        border-width: 4px;
        border-left-style: solid;
        border-left-color: ${props.theme.colors.darkBlue};
        border-radius: 3px;
        padding-left: 12px;
      `;
    }
    return `
      border-left-color: transparent;
      padding-left: 15px;
      border-radius: 0px;
    `;
  }};

  &:hover {
    border-width: 4px;
    border-left-style: solid;
    border-left-color: ${(props) => props.theme.colors.darkBlue};
    border-radius: 3px;
    padding-left: 12px;
  }
`;

export const ItemName = styled.p`
  text-decoration: none;
  color: black;
`;
export const ItemIcon = styled.img`
  margin-right: 20px;
`;
