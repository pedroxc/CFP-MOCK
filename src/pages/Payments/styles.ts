import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  height: calc(100vh - 73px);
  position: relative;
  text-align: center;
  padding-top: 100px;
`;
