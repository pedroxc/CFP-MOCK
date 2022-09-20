import contaFuturoApi from '../config/ContaFuturoApi';
import SimulationApi from '../config/SimulationApi';
import path from '../config/paths';
import { toastError, toastSuccess } from '../../utils/toast/config';
import messages from '../../utils/toast/messages';
import { handleArrayParams } from '../../utils/params';
import { IBankDetails } from '../../models/IBankDetails';

export const importCSV = async (data: FormData): Promise<void | any> => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const response = await contaFuturoApi.post(path.contaFuturoApi.importcsv,
      data, config);
    toastSuccess(messages.import.importSuccess);

    return response;
  } catch (e) {
    toastError(messages.importError);
  }
  return {};
};

export const getEmployees = async (
  size: number,
  skip: number,
  companiesId: string[],
): Promise<any> => {
  const companiesParams = handleArrayParams('ids', companiesId);
  try {
    const response = await contaFuturoApi.get(`${path.contaFuturoApi.employees}?${companiesParams}&skip=${skip}&take=${size}`);
    return response;
  } catch (e) {
    toastError(messages.employees.getError);
    return {};
  }
};

export const updateEmployeeBankDetails = async (
  employeeId: string,
  bankDetails?: IBankDetails,
): Promise<any> => {
  try {
    const response = await SimulationApi.post(path.simulationApi.employees.updateBankDetails, {
      bankDetails,
      employeeId,
    });
    toastSuccess(messages.solicitations.bankDetailsSuccess);
    return response;
  } catch (error) {
    toastError(messages.solicitations.bankDetailsError);
    return {};
  }
};
