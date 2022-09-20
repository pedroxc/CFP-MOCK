import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório')
    .email('Digite um email válido'),
  password: yup.string().required('Senha obrigatória'),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().required('Email obrigatório')
    .email('Digite um email válido'),
});

export const reserPasswordSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas diferentes'),
});
export const reLoginSchema = yup.object().shape({
  password: yup.string().required('Senha obrigatória'),
});
