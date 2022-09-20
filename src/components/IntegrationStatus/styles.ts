import styled from 'styled-components';

interface IStatus {
  color?: string;
}

export const Status = styled.div<IStatus>`
  border: 1px solid ${(props) => props.theme.colors.darkBlue};
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.color};
  border-radius: 5px 20px 20px 5px;
  border-left: 3.5px solid ${(props) => props.theme.colors.darkBlue};
  font-weight: 300;
  font-size: 0.8rem;
  height: 27px;
  min-width: 114px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 14px;
`;
