import styled from 'styled-components';

export const EditButton = styled.button`
  background: ${(props) => props.theme.colors.darkBlue};
  border-radius: 20px;
  height: 32px;
  width: 214px;
  margin-left: 14px;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 300;

  &:disabled {
    cursor: default;
  }
  &:hover {
    box-shadow: 0px 1px 7px ${(props) => props.theme.colors.lightGray};
    transition: 0.3s;
  }
`;
export const ButtonText = styled.div`
  margin-left: 4px;
`;
