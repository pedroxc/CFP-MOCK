import * as yup from 'yup';

export const bankDetailsSchema = yup.object().shape({
  digit_account: yup.string().required('Campo obrigatório').typeError('Campo inválido'),
  type_account: yup.string().required('Campo obrigatório').typeError('Campo inválido'),
  code_bank: yup.string().required('Campo obrigatório').typeError('Campo inválido'),
  agency: yup.string().required('Campo obrigatório').typeError('Campo inválido'),
  account: yup.string().required('Campo obrigatório').typeError('Campo inválido'),
});
