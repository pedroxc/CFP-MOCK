import styled from 'styled-components';

export const PrintButton = styled.button`
  background: ${(props) => props.theme.colors.background};
  border-radius: 20px;
  height: 27px;
  width: 134px;
  margin-left: 14px;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    cursor: default;
  }
`;
export const PrintText = styled.div`
  margin-left: 4px;
`;
