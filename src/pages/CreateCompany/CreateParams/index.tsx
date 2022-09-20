import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import { withTheme, DefaultTheme } from 'styled-components';

import { SelectProps, MenuItem } from '@material-ui/core';
import { createCompanyParams } from '../../../services/Company';
import { createParamsSchema } from '../../../utils/validations/createCompany';
import getValidationErrors from '../../../utils/getValidationErrors';
import { getStorage } from '../../../utils/storage';
import storage from '../../../utils/storage/keys';
import InputMUI from '../../../components/inputMUI';
import Button from '../../../components/button';
import { ICreateParams } from '../../../models/ICreateParams';
import {
  ButtonWrapper,
  FormBox,
  FormTitle,
  InputGroup,
  RegisterBox,
  StepInfo,
  StepInfoContainer,
} from '../styles';

interface ICreateCompanyProps {
    theme: DefaultTheme;
    handleNext: VoidFunction;
}

interface IEvent {
  target?: {
    value: unknown;
  }
}

const modalityOptions = {
  payroll: 'DESCONTO EM FOLHA',
  ticket: 'BOLETO',
};

const plotsMaxMin = [6, 12, 24, 36, 48];

const CreateParams: React.FC<ICreateCompanyProps> = ({ theme, handleNext }) => {
  const formRef = useRef<FormHandles>(null);
  const [companyId, setCompanyId] = useState('');
  const [modalitySelected, setModality] = useState('');
  const [plotsMin, setPlotsMin] = useState<number>();
  const [plotsMax, setPlotsMax] = useState<number>();

  const selectsConfig: SelectProps = {
    MenuProps: {
      PaperProps: {
        style: {
          borderRadius: 10,
        },
      },
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      getContentAnchorEl: null,
    },
  };

  useEffect(() => {
    const idStorage = getStorage(storage.registration.companyId);

    if (idStorage) {
      setCompanyId(idStorage);
    }
  }, []);

  const handleChangeModality = ({ target }: IEvent) => {
    const value = String(target?.value);
    const valueIsPayroll = value === 'payroll';
    formRef?.current?.setFieldValue(
      'modality',
      valueIsPayroll ? modalityOptions.payroll : modalityOptions.ticket,
    );
    setModality(value || '');
  };

  const handlePlotsMin = ({ target }: IEvent) => {
    setPlotsMin(Number(target?.value) || 0);
    formRef?.current?.setFieldValue(
      'quant_plots_params_min',
      Number(target?.value),
    );
  };

  const handlePlotsMax = ({ target }: IEvent) => {
    setPlotsMax(Number(target?.value) || 0);
    formRef?.current?.setFieldValue(
      'quant_plots_params_max',
      Number(target?.value),
    );
  };

  const handleSubmit = useCallback(
    async (data: ICreateParams) => {
      try {
        formRef.current?.setErrors({});
        await createParamsSchema.validate(data, {
          abortEarly: false,
        });
        const response = await createCompanyParams({
          ...data,
          company_id: companyId,
        });

        if (response?.data?.id) {
          handleNext();
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
    <RegisterBox scroll>
      <StepInfoContainer>
        <StepInfo>Parametrização</StepInfo>
        <StepInfo>3 de 3</StepInfo>
      </StepInfoContainer>
      <FormBox ref={formRef} onSubmit={handleSubmit}>
        <InputGroup>
          <InputMUI title="Valor Base" name="base_value" type="number" width="mid" />
          <InputMUI title="Limite" name="limit" type="number" width="mid" />
        </InputGroup>
        <InputGroup>
          <InputMUI
            select
            value={plotsMax || ''}
            title="Quantidade máxima de parcelas"
            type="number"
            name="quant_plots_params_max"
            width="mid"
            onChange={handlePlotsMax}
            SelectProps={selectsConfig}
          >
            {plotsMaxMin?.map((item: number) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </InputMUI>
          <InputMUI
            select
            value={plotsMin || ''}
            title="Quantidade mínima de parcelas"
            type="number"
            name="quant_plots_params_min"
            width="mid"
            onChange={handlePlotsMin}
            SelectProps={selectsConfig}
          >
            {plotsMaxMin?.map((item: number) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </InputMUI>
        </InputGroup>
        <InputGroup>
          <InputMUI title="Valor TAC" name="TAC_value" type="number" width="mid" />
          <InputMUI
            select
            value={modalitySelected || ''}
            title="Modalidade"
            name="modality"
            width="mid"
            onChange={handleChangeModality}
            SelectProps={selectsConfig}
          >
            <MenuItem value="payroll">{modalityOptions.payroll}</MenuItem>
            <MenuItem value="ticket">{modalityOptions.ticket}</MenuItem>
          </InputMUI>
        </InputGroup>
        <InputGroup>
          <InputMUI title="Dia de pagamento devido" name="day_payment_due" type="number" width="mid" />
          <InputMUI title="Dia de pagamento limite" name="payment_date" type="number" width="mid" />
        </InputGroup>
        <InputGroup>
          <InputMUI title="Margem líquida" name="net_margin" type="number" width="mid" />
          <InputMUI title="Risco de meses" name="months_risk" type="number" width="mid" />
        </InputGroup>
        <InputMUI title="Limite de empréstimos contratos" name="hired_loans_limit" type="number" width="mid" />
        <FormTitle>Taxas</FormTitle>
        <InputGroup>
          <InputMUI title="Grupo 1" name="fees_group1" type="double" width="mid" />
          <InputMUI title="Grupo 2" name="fees_group2" type="double" width="mid" />
        </InputGroup>
        <InputGroup>
          <InputMUI title="Grupo 3" name="fees_group3" type="double" width="mid" />
          <InputMUI title="Grupo 4" name="fees_group4" type="double" width="mid" />
        </InputGroup>
        <ButtonWrapper freePosition>
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

export default withTheme(CreateParams);
