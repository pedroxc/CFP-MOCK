import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  width: 280px;
  position: relative;
  box-shadow: inset -3px 1px 0px -2px ${(props) => props.theme.colors.lightGray};
`;

export const GridItems = styled.div`
  display: flex;
  flex-direction: column;
`;
