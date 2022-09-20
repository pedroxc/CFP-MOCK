import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as yup from 'yup';
import { withTheme, DefaultTheme } from 'styled-components';
import { useAuth } from '../../../hooks/auth';
import { sendForgotPassword } from '../../../services/User';
import getValidationErrors from '../../../utils/getValidationErrors';
import { signInSchema, forgetPasswordSchema } from '../../../utils/validations/auth';
import InputMUI from '../../../components/inputMUI';
import Button from '../../../components/button';

import {
  Container, LoginBox, Logo, LogInTitle, ButtonWrapper, ForgetPassText,
} from '../styles';

interface ISignInProps {
  theme: DefaultTheme;
}

interface SignInDataObject {
  email: string;
  password: string;
}

const SignIn: React.FC<ISignInProps> = ({ theme }) => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [forgetPasswordView, setForgetPasswordView] = useState(false);
  const { signIn } = useAuth();

  const handleSubmitLogin = useCallback(
    async (data: SignInDataObject) => {
      try {
        formRef.current?.setErrors({});
        await signInSchema.validate(data, {
          abortEarly: false,
        });

        const { status } = await signIn({ email: data.email, password: data.password });

        if (status === 'logged') {
          history.push('/home');
        }
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    },
    [signIn, history],
  );

  const handleSubmitForgetPassword = useCallback(
    async (data: SignInDataObject) => {
      try {
        formRef.current?.setErrors({});
        await forgetPasswordSchema.validate(data, {
          abortEarly: false,
        });

        await sendForgotPassword({ email: data.email });
        setForgetPasswordView(false);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    },
    [],
  );

  const loginForm = () => (
    <Form ref={formRef} onSubmit={handleSubmitLogin}>
      <LogInTitle>Entre com sua conta</LogInTitle>
      <InputMUI title="Usuário" name="email" />
      <InputMUI type="password" title="Senha" name="password" />
      <ButtonWrapper>
        <Button
          type="submit"
          background={theme.colors.lightGreen}
          textColor={theme.colors.textPrimary}
        >
          Continuar
        </Button>
      </ButtonWrapper>
      <ForgetPassText onClick={() => setForgetPasswordView(true)}>
        Esqueceu a senha?
      </ForgetPassText>
    </Form>
  );

  const forgetPasswordForm = () => (
    <Form ref={formRef} onSubmit={handleSubmitForgetPassword}>
      <LogInTitle>Recuperar a senha</LogInTitle>
      <InputMUI title="Email" name="email" />
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
  );

  return (
    <Container>
      <Logo />
      <LoginBox>
        {!forgetPasswordView && loginForm() }
        {forgetPasswordView && forgetPasswordForm() }
      </LoginBox>
    </Container>
  );
};

export default withTheme(SignIn);
