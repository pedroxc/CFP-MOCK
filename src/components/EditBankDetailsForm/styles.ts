import styled from 'styled-components';
import { Form } from '@unform/web';

export const FormTitle = styled.h2`
  font-size: 18px;
  margin: 17px 0;
  font-weight: 600;
  text-align: left;
`;

export const FormBox = styled(Form)`
  position: relative;
  height: 90%;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 48px;
  position: absolute;
  bottom: 0px;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
