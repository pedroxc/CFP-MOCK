import ContaFuturoApi from '../config/ContaFuturoApi';
import SimulationApi from '../config/SimulationApi';
import path from '../config/paths';
import { toastError, toastSuccess } from '../../utils/toast/config';
import messages from '../../utils/toast/messages';
import { IBankDetails } from '../../models/IBankDetails';
import { handleArrayParams } from '../../utils/params';

interface IResponse {
  data?: {
    status: string;
    Result: boolean;
  }
}

export const getSolicitations = async (
  size: number,
  skip: number,
  companiesId: string[],
  status: string,
  requesterId?: string,
  integrationId?: string,
): Promise<any> => {
  const companiesParams = handleArrayParams('ids', companiesId);
  try {
    const response = await ContaFuturoApi.get(
      `${path.contaFuturoApi.solicitationsByCompany}?${companiesParams}&activate=true&status=${status}&skip=${skip}&take=${size}&requesterId=${requesterId || ''}&integrationId=${integrationId || ''}`,
    );

    return response;
  } catch (error) {
    toastError(messages.solicitations.getError);
    return {};
  }
};

export const acceptSolicitation = async (
  companyId: string,
  solicitationId: string,
  userId: string,
): Promise<IResponse> => {
  try {
    const response = await SimulationApi.post(
      path.simulationApi.solicitations.aprrove,
      {
        companyId,
        solicitationId,
        userId,
      },
    );

    toastSuccess(messages.solicitations.approveSuccess);
    return response;
  } catch (error) {
    toastError(messages.solicitations.approveError);
    return {};
  }
};

export const refuseSolicitation = async (
  solicitationId: string,
  userId: string,
  message: string,
): Promise<IResponse> => {
  try {
    const response = await ContaFuturoApi.patch(
      `${path.contaFuturoApi.solicitations}?id=${solicitationId}`,
      {
        status: 'REFUSED',
        status_message: message,
        user_id_solicitation_updated: userId,
      },
    );

    toastSuccess(messages.solicitations.refuseSuccess);
    return response;
  } catch (error) {
    toastError(messages.solicitations.refuseError);
    return {};
  }
};

export const cancelSolicitation = async (
  solicitationId: string,
  userId: string,
): Promise<IResponse> => {
  try {
    const response = await SimulationApi.post(
      path.simulationApi.solicitations.cancel,
      { solicitationId, userId },
    );

    toastSuccess(messages.solicitations.canceledSuccess);
    return response;
  } catch (error) {
    toastError(messages.solicitations.canceledError);
    return {};
  }
};

export const updateBankDetails = async (
  proposalCode: string,
  bankDetails: IBankDetails,
  employeeId: string,
): Promise<IResponse> => {
  try {
    const response = await SimulationApi.post(
      path.simulationApi.solicitations.updateBankDetais,
      { proposalCode, bankDetails, employeeId },
    );
    toastSuccess(messages.solicitations.bankDetailsSuccess);
    return response;
  } catch (error) {
    toastError(messages.solicitations.bankDetailsError);
    return {};
  }
};

export const signSolicitation = async (
  employeeId: string,
  solicitationId: string,
  proposalCode: string,
  ip: string,
  deviceType: string,
  isMobile: boolean,
): Promise<IResponse> => {
  try {
    const response = await SimulationApi.post(
      path.simulationApi.solicitations.assign,
      {
        employeeId,
        solicitationId,
        proposalCode,
        ip,
        device_type: deviceType,
        is_mobile: isMobile,
      },
    );
    toastSuccess(messages.solicitations.signSuccess);
    return response;
  } catch (error) {
    toastError(messages.solicitations.signError);
  }
  return {};
};
