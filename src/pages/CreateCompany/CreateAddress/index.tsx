import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import { withTheme, DefaultTheme } from 'styled-components';

import { createCompanyAddress } from '../../../services/Company';
import { getCepInfo } from '../../../services/SearchCEP';
import { createAddressSchema } from '../../../utils/validations/createCompany';
import getValidationErrors from '../../../utils/getValidationErrors';
import { getStorage } from '../../../utils/storage';
import storage from '../../../utils/storage/keys';
import masks from '../../../utils/masks';
import InputMUI from '../../../components/inputMUI';
import Button from '../../../components/button';
import { ICreateAddress } from '../../../models/ICreateAddress';
import {
  ButtonWrapper,
  FormBox,
  InputGroup,
  RegisterBox,
  StepInfo,
  StepInfoContainer,
} from '../styles';

interface ICreateCompanyProps {
  theme: DefaultTheme;
  handleNext(step: string): void;
}

const steps = {
  main: 'mainInfo',
  address: 'address',
  params: 'params',
};

interface ICepInfo {
  neighborhood?: string;
  city?: string;
  state?: string;
  street?: string;
  cep?: string
}

const CreateAddress: React.FC<ICreateCompanyProps> = ({ theme, handleNext }) => {
  const formRef = useRef<FormHandles>(null);
  const [companyId, setCompanyId] = useState('');
  const [dataFilledByCep, setDataFilledByCep] = useState<ICepInfo>({});
  const [loadingCep, setLoadingCep] = useState(true);

  useEffect(() => {
    const idStorage = getStorage(storage.registration.companyId);

    if (idStorage) {
      setCompanyId(idStorage);
    }
  }, []);

  const handleCep = useCallback(async () => {
    const newCep = formRef.current?.getFieldValue('cep');
    if (newCep) {
      setLoadingCep(true);

      const data = await getCepInfo(newCep);
      if (data) {
        setDataFilledByCep(data);
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: ICreateAddress) => {
      try {
        const formattedData = {
          ...data,
          cep: data.cep?.replace(/[^\d]/g, ''),
          city: data.city.trim(),
          street: data.street.trim(),
          state: data.state.trim(),
          complement: data.complement.trim(),
          number: data.number.trim(),
          neighborhood: data.neighborhood.trim(),
        };

        formRef.current?.setErrors({});
        await createAddressSchema.validate(formattedData, {
          abortEarly: false,
        });
        const response = await createCompanyAddress({
          ...formattedData,
          companyId,
        });

        if (response?.data?.id) {
          handleNext(steps.params);
        }
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    }, [handleNext, companyId],
  );

  return (
    <RegisterBox>
      <StepInfoContainer>
        <StepInfo>Endereço</StepInfo>
        <StepInfo>2 de 3</StepInfo>
      </StepInfoContainer>
      <FormBox ref={formRef} onSubmit={handleSubmit}>
        <InputMUI title="CEP" name="cep" mask={masks.cep} onBlur={() => handleCep()} />
        <InputGroup>
          <InputMUI title="Avenida/Rua" name="street" width="big" value={dataFilledByCep?.street || ' '} />
          <InputMUI title="Número" name="number" width="small" defaultValue={' '} />
        </InputGroup>
        <InputGroup>
          <InputMUI title="Complemento" name="complement" width="big" defaultValue={' '} />
          <InputMUI title="Bairro" name="neighborhood" width="small" value={dataFilledByCep?.neighborhood || ' '} />
        </InputGroup>
        <InputGroup>
          <InputMUI title="Cidade" name="city" width="big" value={dataFilledByCep?.city || ' '} disabled />
          <InputMUI title="Estado" name="state" width="small" value={dataFilledByCep?.state || ' '} disabled />
        </InputGroup>
        <ButtonWrapper>
          <Button
            type="submit"
            background={theme.colors.darkBlue}
          >
            Avançar
          </Button>
        </ButtonWrapper>
      </FormBox>
    </RegisterBox>
  );
};

export default withTheme(CreateAddress);
