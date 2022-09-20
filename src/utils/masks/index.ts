import Moment from 'moment';

export default {
  cnpj: '99.999.999-9999/99',
  phone: '(99)9999-9999',
  cep: '99999-999',
  formatPhone: (phone: string): string => phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
  formatCpf: (cpf: string): string => cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
  formarDate: (date: string): string => Moment.utc(Moment(date).utc()).format('DD/MM/YYYY'),
  cpf: '999.999.999-99',
  date: 'DD/MM/YYYY',
};
