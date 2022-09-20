import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const configOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastSuccess = (message: string) : void => {
  toast.success(message, configOptions);
};

export const toastError = (message: string) : void => {
  toast.error(message, configOptions);
};
