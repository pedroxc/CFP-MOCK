import styled from 'styled-components';

interface IStatus {
  flagColor?: string;
}

export const Status = styled.div<IStatus>`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  background-color: white;
  color: black;
  border-radius: 5px 20px 20px 5px;
  border-left: 3.5px solid ${(props) => props.flagColor};
  font-weight: 600;
  font-size: 0.8rem;
  height: 27px;
  min-width: 114px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 14px;
`;
