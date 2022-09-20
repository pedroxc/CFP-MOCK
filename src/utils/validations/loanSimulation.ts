import * as yup from 'yup';

export const loanSimulationSchema = yup.object().shape({
  cpf: yup.string().required('cpf obrigatório'),
});
export const paymentSimulationSchema = yup.object().shape({

  documentNumber: yup.string().required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  cnpj: yup.string().required('CNPJ obrigatório')
    .transform((value) => value.replace(/[^\d]/g, ''))
    .length(14, 'CNPJ inválido'),

});
export const loanValueSchema = yup.object().shape({
  loanValue: yup.number().required('Campo obrigatório'),
});
