import { AxiosResponse } from 'axios';
import SimulationApi from '../config/SimulationApi';
import { toastError, toastSuccess } from '../../utils/toast/config';
import messages from '../../utils/toast/messages';
import ContaFuturoApi from '../config/ContaFuturoApi';
import { statusErrorDefaultMessage } from './utils';

interface IResponse {
  data: {
    companyEmails: any,
    limitAvailable: number,
    companyPaymentDate: string,
    employeeId: string,
    employeeName: string,
    filtredGridPerMarginNet: [];
  };
}
interface ICreatePaymentSplisDTO {
  paymentDay: Date;
  digitableLine: string;
  bankNumber: string;
  nameAssignor: string;
  cnpjAssignor?: string;
  accountType?: number;
  documentValue?: number;
}
interface IOptionLoanRequest {
  numParcelas: number;
  vlParcela: string;
  TACValue: number;
  IOFvalue: number;
  percIOF: number;
  totalValueCredit: number;
  totalValueDebt: number;
  percCETMonthly: number;
  percCETYearly: number;
  percFeesMonthly: number;
  percFeesYearly: number;
}
interface ICreateSolicitationDTO {
  device?: string;
  type: string;
  status: string;
  activate: boolean;
  simulationId: string;
  codigoPropostaMp?: string;
  userRequesterId?: string;
}

export const getLimitAvailable = async (cpf: string): Promise<IResponse | any> => {
  try {
    const response = await SimulationApi.get(`/users/employees/limit-available/${cpf}`);

    return response;
  } catch (error) {
    toastError(messages.simulation.cpfConsultError);
    return {};
  }
};
export const getGridPlot = async (requestValue: number,
  cpf: string | null): Promise<IResponse> => {
  const response = await SimulationApi.post('/users/employees/grid-plot', {
    loanValue: requestValue,
    cpf,
  });

  if (response?.status === 200) {
    return response;
  }
  return response;
};

export const createPaymentSplitContaFuturo = async ({
  digitableLine,
  paymentDay,
  bankNumber,
  nameAssignor,
  cnpjAssignor,
  accountType = 1,
  documentValue,
}: ICreatePaymentSplisDTO): Promise<AxiosResponse | any> => {
  try {
    const response = await ContaFuturoApi.post('/payment-splis', {
      account_type: accountType,
      bank_number: bankNumber,
      digitable_line: digitableLine,
      name_assignor: nameAssignor,
      cnpj_assignor: cnpjAssignor,
      payment_day: paymentDay,
      document_value: documentValue,
    });
    return response;
  } catch (error) {
    toastError(messages.simulation.cpfConsultError);
  }
  return {};
};
export const createSimulationContaFuturo = async (
  simulation: IOptionLoanRequest,
  totalValue: number,
  employee: string,
  paymentSlip?: string,
  hasPayment?: boolean,

): Promise<AxiosResponse | any> => {
  try {
    const response = await ContaFuturoApi.post('/simulations', {
      plot_value: simulation.vlParcela,
      quant_plots: simulation.numParcelas,
      perc_IOF: simulation.percIOF,
      IOF_value: simulation.IOFvalue,
      TAC_value: simulation.TACValue,
      total_value_credit: simulation.totalValueCredit,
      total_value_debt: simulation.totalValueDebt,
      perc_CET_monthly: simulation.percCETMonthly,
      perc_CET_yearly: simulation.percCETYearly,
      perc_fees_monthly: simulation.percCETMonthly,
      perc_fees_yearly: simulation.percFeesYearly,
      employee_id: employee,
      total_value: totalValue,
      payment_slips_id: paymentSlip,
      has_payment: hasPayment,
    });
    return response;
  } catch (error) {
    return {};
  }
};
export const createSolicitationContaFuturo = async ({
  activate,
  simulationId,
  status,
  type,
  device,
  codigoPropostaMp,
  userRequesterId,
}: ICreateSolicitationDTO): Promise<AxiosResponse | any> => {
  try {
    const response = await ContaFuturoApi.post('/solicitations', {
      activate,
      simulation_id: simulationId,
      status,
      type,
      device,
      codigo_proposta_mp: codigoPropostaMp,
      user_requester_id: userRequesterId,
    });
    return response;
  } catch (error) {
    return {};
  }
};

export const sendEmailToRhSolicitation = async (
  email: string,
  name: string,
): Promise<AxiosResponse | any> => {
  try {
    const response = await ContaFuturoApi.post(
      '/solicitations/notification-rh',
      {
        email,
        name,
      },
    );
    return response;
  } catch (error) {
    return {};
  }
};
