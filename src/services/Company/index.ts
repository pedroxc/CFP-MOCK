import contaFuturoApi from '../config/ContaFuturoApi';
import path from '../config/paths';
import { toastError, toastSuccess } from '../../utils/toast/config';
import messages from '../../utils/toast/messages';
import { ICreateAddress } from '../../models/ICreateAddress';
import { ICreateParams } from '../../models/ICreateParams';

interface IResponse {
  data: {
    id?: string;
    companyId?: string;
    name?: string;
    registerStep?: string;
    companyExists?: boolean,
  };
}

interface ICreateCompany {
  name: string,
  email: string,
  phone: string,
  cnpj: string,
  tradeName: string
}

export const createCompany = async ({
  name,
  email,
  phone,
  cnpj,
  tradeName,
}: ICreateCompany): Promise<IResponse> => {
  try {
    const response = await contaFuturoApi.post(path.contaFuturoApi.company, {
      name,
      email_rh: email,
      phone,
      cnpj,
      common_name: tradeName,
    });

    toastSuccess(messages.company.createStart);
    return response;
  } catch (error) {
    toastError(messages.createError);
    return { data: {} };
  }
};

export const createCompanyAddress = async (data: ICreateAddress): Promise<IResponse> => {
  try {
    const response = await contaFuturoApi.post(
      path.contaFuturoApi.address,
      data,
    );

    toastSuccess(messages.company.createAddress);
    return response;
  } catch (error) {
    toastError(messages.createError);
    return { data: {} };
  }
};

export const createCompanyParams = async (data: ICreateParams): Promise<IResponse> => {
  try {
    const response = await contaFuturoApi.post(
      path.contaFuturoApi.params,
      data,
    );

    toastSuccess(messages.company.createFinish);
    return response;
  } catch (error) {
    toastError(messages.createError);
    return { data: {} };
  }
};

export const verifyCompany = async ({
  cnpj,
}: ICreateCompany): Promise<IResponse> => {
  try {
    const response = await contaFuturoApi.get(
      `${path.contaFuturoApi.companyCheck}?cnpj=${cnpj}`,
    );
    const { companyId, name } = response.data;
    if (companyId && name) {
      toastSuccess(messages.company.continueCreation(name));
      return response;
    }

    return { data: {} };
  } catch (error) {
    toastError(messages.company.isCreated);
    return { data: { companyExists: true } };
  }
};
