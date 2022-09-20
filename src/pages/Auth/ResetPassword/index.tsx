import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { DefaultTheme, withTheme } from 'styled-components';
import getValidationErrors from '../../../utils/getValidationErrors';
import {
  ButtonWrapper,
  Container, LoginBox, LogInTitle, Logo,
} from '../styles';
import InputMUI from '../../../components/inputMUI';
import Button from '../../../components/button';
import { reserPasswordSchema } from '../../../utils/validations/auth';
import { resetPassword } from '../../../services/User';

interface ResetPasswordProps {
  theme: DefaultTheme;
}

interface resetPasswordDataObject {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ theme }) => {
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: resetPasswordDataObject) => {
      try {
        formRef.current?.setErrors({});
        await reserPasswordSchema.validate(data, {
          abortEarly: false,
        });
        const newData = {
          userId: query.get('token') || '',
          password: data.password,
        };
        await resetPassword(newData);
        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    }, [],
  );

  return (
    <Container>
      <Logo />
      <LoginBox>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <LogInTitle>Criar nova senha</LogInTitle>
          <InputMUI title="Senha" name="password" type="password" />
          <InputMUI title="Confirmar Senha" name="confirmPassword" type="password" />
          <ButtonWrapper>
            <Button
              type="submit"
              background={theme.colors.lightGreen}
              textColor={theme.colors.textPrimary}
            >
              Enviar
            </Button>
          </ButtonWrapper>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default withTheme(ResetPassword);
