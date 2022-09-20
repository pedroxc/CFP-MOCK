import * as yup from 'yup';
import { onlyNumber } from './regex';

export const cnpjValidation = async (value: string): Promise<boolean> => {
  if (!value) return false;

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const isString = typeof value === 'string';
  const validTypes = isString || Number.isInteger(value) || Array.isArray(value);

  // Elimina valor em formato inválido
  if (!validTypes) return false;

  // Filtro inicial para entradas do tipo string
  if (isString) {
    // Limita ao máximo de 18 caracteres, para CNPJ formatado
    if (value.length > 18) return false;

    // Teste Regex para veificar se é uma string apenas dígitos válida
    const digitsOnly = /^\d{14}$/.test(value);

    // Se o formato é válido, usa um truque para seguir o fluxo da validação
    if (!digitsOnly) return false;
  }
  // Guarda um array com todos os dígitos do valor
  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false;

  // Elimina inválidos com todos os dígitos iguais
  const items = numbers.filter((el, pos) => numbers.indexOf(el) === pos);
  if (items.length === 1) return false;

  // Cálculo validador
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calc = (x: any) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      // eslint-disable-next-line no-plusplus
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);
    return result > 9 ? 0 : result;
  };

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12);

  // Valida 1o. dígito verificador
  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  // Valida 2o. dígito verificador
  const digit1 = calc(13);
  return digit1 === digits[1];
};

const createMainInfoSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  tradeName: yup.string().required('Campo obrigatório'),
  cnpj: yup.string().required('Campo obrigatório')
    .transform((value) => value.replace(/[^\d]/g, ''))
    .length(14, 'CNPJ inválido'),
  phone: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório')
    .email('Digite um email válido'),
});

const companyVerify = yup.object().shape({
  cnpj: yup.string().required('CNPJ obrigatório')
    .test('cnpjCehck',
      'CNPJ inválido',
      async (value) => cnpjValidation(value || '')),
});

const createAddressSchema = yup.object().shape({
  street: yup.string().required('Avenida/Rua obrigatório'),
  number: yup.string().required('Número obrigatório')
    .transform((value) => value.replace(/[^\d]/g, ''))
    .matches(onlyNumber, 'Número inválido'),
  neighborhood: yup.string().required('Bairro obrigatório'),
  city: yup.string().required('Cidade obrigatório'),
  state: yup.string().required('Estado obrigatório')
    .length(2, 'CEP inválido'),
  cep: yup.string().required('CEP obrigatório')
    .length(8, 'CEP inválido')
    .matches(onlyNumber, 'Digite apenas os números do CEP'),
});

const createParamsSchema = yup.object().shape({
  base_value: yup.string().required('Campo obrigatório'),
  limit: yup.string().required('Campo obrigatório'),
  net_margin: yup.string().required('Campo obrigatório'),
  payment_date: yup.number().required('Campo obrigatório')
    .max(31, 'Dia inválido. máximo: 31')
    .typeError('Necessário inserir um dia.'),
  day_payment_due: yup.number().required('Campo obrigatório')
    .max(31, 'Dia inválido. máximo: 31')
    .typeError('Necessário inserir um dia.'),
  modality: yup.string().required('Campo obrigatório'),
  quant_plots_params_max: yup.string().required('Campo obrigatório'),
  quant_plots_params_min: yup.string().required('Campo obrigatório'),
});

export {
  createMainInfoSchema, createAddressSchema, createParamsSchema, companyVerify,
};
