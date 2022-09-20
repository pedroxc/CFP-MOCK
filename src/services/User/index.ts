import { toastError, toastSuccess } from '../../utils/toast/config';
import messages from '../../utils/toast/messages';
import contaFuturoApi from '../config/ContaFuturoApi';
import paths from '../config/paths';

interface IRecoverPasswordEmail {
  email: string;
}

interface IResetPassword {
  userId: string,
  password: string,
}

interface IResponse {
  status: number;
}

export const sendForgotPassword = async ({
  email,
}: IRecoverPasswordEmail): Promise<IResponse> => {
  try {
    const response = await contaFuturoApi.post(paths.contaFuturoApi.forgetPassword, {
      email,
    });

    toastSuccess(messages.user.forgetPasswordSuccess);
    return response;
  } catch (error) {
    toastError(messages.user.forgetPasswordError);
    return { status: 500 };
  }
};

export const resetPassword = async ({
  userId,
  password,
}: IResetPassword): Promise<IResponse> => {
  try {
    const response = await contaFuturoApi.post(paths.contaFuturoApi.resetPassword, {
      user_id: userId,
      password,
    });

    toastSuccess(messages.user.resetPasswordSuccess);
    return response;
  } catch (error) {
    toastError(messages.user.resetPasswordError);
    return { status: 500 };
  }
};
