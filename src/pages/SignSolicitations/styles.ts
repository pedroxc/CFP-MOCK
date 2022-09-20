import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-left: 50px;
  padding-top: 20px;
  background: ${(props) => props.theme.colors.background};
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 95%;
  min-width: 1000px;
`;
