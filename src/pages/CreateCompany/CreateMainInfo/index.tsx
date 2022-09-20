import React, { useCallback, useRef, useState } from 'react';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import { withTheme, DefaultTheme } from 'styled-components';

import { createCompany, verifyCompany } from '../../../services/Company';
import { createMainInfoSchema, companyVerify } from '../../../utils/validations/createCompany';
import getValidationErrors from '../../../utils/getValidationErrors';
import Button from '../../../components/button';
import {
  ButtonWrapper,
  FormBox,
  RegisterBox,
  StepInfo,
  StepInfoContainer,
} from '../styles';
import { setStorage } from '../../../utils/storage';
import storage from '../../../utils/storage/keys';
import InputMui from '../../../components/inputMUI';
import masks from '../../../utils/masks';

interface ICreateCompanyProps {
  theme: DefaultTheme;
  handleNext(step: string): void;
}

interface ICreateCompany {
  name: string,
  email: string,
  phone: string,
  cnpj: string,
  tradeName: string;
}

const steps = {
  main: 'mainInfo',
  address: 'address',
  params: 'params',
};

const CreateMainInfo: React.FC<ICreateCompanyProps> = ({ theme, handleNext }) => {
  const formRef = useRef<FormHandles>(null);
  const [companyCheked, setCompanyChecked] = useState(false);
  const [cnpjTyped, setCnpjTyped] = useState('');

  const storageCompanyData = useCallback((companyId, name, step) => {
    setStorage(storage.registration.companyId, companyId);
    setStorage(storage.registration.companyName, name);
    handleNext(step);
  }, [handleNext]);

  const handleSubmit = useCallback(
    async (data: ICreateCompany) => {
      try {
        formRef.current?.setErrors({});
        const formattedData = { ...data, cnpj: data.cnpj.replace(/[^\d]/g, '') };

        if (companyCheked) {
          await createMainInfoSchema.validate(formattedData, {
            abortEarly: false,
          });

          const response = await createCompany(formattedData);
          const { id, name } = response.data;
          if (id && name) {
            storageCompanyData(id, name, steps.address);
          }
        } else {
          await companyVerify.validate(formattedData, {
            abortEarly: false,
          });
          const response = await verifyCompany(formattedData);
          const {
            companyId, name, registerStep, companyExists,
          } = response.data;
          if (companyId && registerStep && name) {
            storageCompanyData(companyId, name, registerStep);
          } else if (!companyExists) {
            setCnpjTyped(data.cnpj);
            setCompanyChecked(true);
          }
        }
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    },
    [companyCheked, storageCompanyData],
  );

  return (
    <RegisterBox>
      <StepInfoContainer>
        <StepInfo>Informações Principais</StepInfo>
        <StepInfo>1 de 3</StepInfo>
      </StepInfoContainer>
      {companyCheked && (
        <FormBox ref={formRef} onSubmit={handleSubmit}>
          <InputMui title="Razão Social" name="name" />
          <InputMui title="Nome Fantasia" name="tradeName" />
          <InputMui title="CNPJ" name="cnpj" defaultValue={cnpjTyped} disabled />
          <InputMui title="Telefone" name="phone" mask={masks.phone} />
          <InputMui title="Email" name="email" />
          <ButtonWrapper>
            <Button
              background={theme.colors.lightGray}
              width="220px"
              onClick={() => setCompanyChecked(false)}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              background={theme.colors.darkBlue}
              width="350px"
            >
              Avançar
            </Button>
          </ButtonWrapper>
        </FormBox>
      )}
      {!companyCheked && (
        <FormBox ref={formRef} onSubmit={handleSubmit}>
          <InputMui title="CNPJ" name="cnpj" mask={masks.cnpj} />
          <ButtonWrapper>
            <Button
              type="submit"
              background={theme.colors.darkBlue}
            >
              Avançar
            </Button>
          </ButtonWrapper>
        </FormBox>
      )}
    </RegisterBox>
  );
};

export default withTheme(CreateMainInfo);
