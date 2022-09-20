import CepApi from '../config/CepApi';

interface ICepInfo {
  neighborhood?: string;
  city?: string;
  state?: string;
  street?: string;
}

export const getCepInfo = async (cep: string): Promise<ICepInfo> => {
  const { data } = await CepApi.get('/cep.json', {
    params: {
      code: cep,
    },
  });

  if (data?.status === 200) {
    const {
      address,
      city,
      state,
      district,
    } = data;

    return {
      neighborhood: district,
      street: address,
      city,
      state,
    };
  }
  return {};
};
