import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  z-index: 10000;
  height: calc(100vh - 73px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  align-items: stretch;
  background: #70707060;
  margin-bottom:73px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
img{
  width:50px;
}
`;

const arrowAnimation = keyframes`
  from {
    transform: translateY(5px);
  }

  to {
    transform: translateY(-5px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${arrowAnimation} 1s linear infinite;

`;
