import styled from 'styled-components';

export const Container = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  padding: 11px 15px;
  background: ${(props) => props.theme.colors.auxBackground};
  border: 1px solid #F1F1F5;
  box-sizing: border-box;
  border-radius: 15px;

  input {
    flex: 1;
    width: 100%;
    color: ${(props) => props.theme.colors.textPrimary};
    height: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    &::-webkit-input-placeholder {
      color: ${(props) => props.theme.colors.placeholder};
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;

export const ErrorMessage = styled.strong`
  color: #ff988d;
  font-size: 24px;
  font-weight: 700;
`;
