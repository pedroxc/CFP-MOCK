import React from 'react';

import { Container, Content, AnimationContainer } from './styles';
import circleIcon from '../../assets/images/icons/iconContaFuturo.png';

// import { Container } from './styles';

const LoadingPage: React.FC = () => (
  <Container>
    <Content>
      <AnimationContainer>
        <img src={circleIcon} alt="" />
      </AnimationContainer>
    </Content>
  </Container>
);

export default LoadingPage;
