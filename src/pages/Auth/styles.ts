import styled from 'styled-components';
import LogoIcon from '../../assets/images/LogoIcon.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  width: 100vw;
  padding-bottom: 186px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 350px;
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  text-align: center;
`;

export const Logo = styled.img.attrs({
  src: LogoIcon,
})`
  width: 211px;
  height:136px;
  text-align: center;
  margin: 0 auto 50px;
`;

export const LogInTitle = styled.h1`
  margin-bottom: 22px;
  font-size: 16px;
  line-height: 27px;
`;

export const ButtonWrapper = styled.div`
  height: 48px;
  margin: auto;
`;

export const ForgetPassText = styled.a`
  font-size: 12px;
  color: ${(props) => props.theme.colors.lightGray};
  text-align: center;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.darkBlue};
  }
`;
