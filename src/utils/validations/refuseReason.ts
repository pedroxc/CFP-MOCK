import * as yup from 'yup';

export const refuseReasonSchema = yup.object().shape({
  message: yup.string().required('Campo obrigatório').typeError('Campo inválido'),
});
