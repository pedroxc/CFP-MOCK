import styled from 'styled-components';
import { Form } from '@unform/web';

interface IRegisterBox {
  scroll?: boolean;
}

interface IButtonWrapper {
  freePosition?: boolean;
}

export const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  height: calc(100vh - 73px);
  position: relative;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const RegisterBox = styled.div<IRegisterBox>`
  background: white;
  border-radius: 10px;
  width: 640px;
  box-shadow: 0px 1px 4px ${(props) => props.theme.colors.lightGray};
  height: 100%;
  max-height: 600px;
  position: relative;
  margin: 0 auto;
  padding: 25px;
  overflow-y: ${(props) => (props.scroll ? 'scroll' : 'unset')};

  @media(min-height: 800px) {
    max-height: ${(props) => (props.scroll ? '800px' : '640px')};
  }
`;

export const FormBox = styled(Form)`
  position: relative;
  height: 90%;
`;

export const StepInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .MuiSelect-select {
    text-transform: captalize;
    font-size: 14px;
    text-align: left;

    &:focus {
      background: transparent;
    }
  }
`;

export const ButtonWrapper = styled.div<IButtonWrapper>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 48px;
  ${(props) => {
    if (props.freePosition) {
      return 'margin-top: 15px';
    }
    return `
      position: absolute;
      bottom: 15px;
    `;
  }};
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 22px;
  margin: 20px 0;
`;

export const StepInfo = styled.h2`
  font-weight: bold;
  font-size: 18px;
`;

export const FormTitle = styled.h2`
  font-size: 18px;
  margin: 17px 0;
  text-align: left;
`;
