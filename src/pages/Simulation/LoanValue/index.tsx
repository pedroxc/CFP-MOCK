/* eslint-disable react/jsx-no-bind */
import React, { useRef } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { FormHandles } from '@unform/core';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import Button from '../../../components/button';
import { maskMoneyString } from '../utils';
import { getGridPlot } from '../../../services/Simulation';
import { ISimulation } from '../../../models/ISimulation';
import { toastError } from '../../../utils/toast/config';
import messages from '../../../utils/toast/messages';

import {
  LimitAvailable,
  SimulationBox, ButtonWrapper, FormBox, Title, InputCustom,
} from '../styles';

interface ILoanValueProps {
  theme: DefaultTheme;
  handleNext(step: string): void;
  changeData: any;
  simulationData: ISimulationData | ISimulation
  changeStep: any,
  handleLoading: (setLoading: boolean,) => void;
  changeRequestValue: any,
}

interface ISimulationData {
  hasPayment: boolean,
  limitAvailable: number,
  attendanceType: string;
  cpf: string;
  nameAssignor: string,
  cnpjAssignor: string,
  bankMatched: IBankMatched,
  valueDocument: number,
  paymentDate: string,
  barcodeValue: string,
  typeTitle: string,
  integerValueDocument: number,
  loanValue: number,
  requestValue: number,
}
interface IBankMatched {
  label: string;
  value: string;
}

const steps = {
  main: 'CpfConsult',
  second: 'PaymentDetails',
  third: 'LoanValue',
  forth: 'gridPlot',
};

const LoanValue: React.FC<ILoanValueProps> = ({
  changeData, theme, handleNext, simulationData, changeStep, changeRequestValue,
  handleLoading,
}) => {
  const formRef = useRef<FormHandles>(null);
  function handleChange(
    event: any,
    maskedvalue: any,
    floatvalue: number,
  ): void {
    const { integerValueDocument } = simulationData;
    const requestValue = floatvalue + (integerValueDocument / 100);
    changeRequestValue(floatvalue, requestValue);
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      handleLoading(true);
      const { loanValue, integerValueDocument } = simulationData;
      const requestValue = loanValue + (integerValueDocument / 100);
      changeRequestValue(loanValue);

      if (requestValue > simulationData.limitAvailable) {
        toastError(messages.simulation.loanValueLimitError);
        return;
      }
      const response = await getGridPlot(requestValue, simulationData.cpf);
      const gripPlot = response.data.filtredGridPerMarginNet;
      changeData('gridPlot', gripPlot);
      handleLoading(false);
      handleNext(steps.forth);
    } catch (error) {
      handleLoading(false);
      toastError(messages.simulation.loanValueError);
    }
  };

  return (
    <SimulationBox>
      <Title className="loanPage">
        {simulationData.hasPayment && simulationData.integerValueDocument
          ? `Além do valor R$ ${formatCurrency(
            simulationData.integerValueDocument / 100,
          )} \n você precisa de mais algum valor?`
          : 'Digite o valor do emprestimo'}
      </Title>
      <FormBox ref={formRef} onSubmit={handleSubmit}>
        <InputCustom
          placeholder={`R$${maskMoneyString(simulationData.limitAvailable)}`}
          onChangeEvent={handleChange}
          value={simulationData.loanValue}
        />
        <LimitAvailable>
          {`Limite disponível: R$${maskMoneyString(
            simulationData.limitAvailable,
          )}`}

        </LimitAvailable>
        <ButtonWrapper>
          <Button
            width="220px"
            background={theme.colors.lightGray}
            className="backbutton"
            type="button"
            onClick={() => {
              changeData('loanValue', 0);
              changeData('gridPlotSelected', {});
              changeStep(steps.second);
            }}
          >
            voltar
          </Button>
          <Button
            width="350px"
            type="submit"
            background={theme.colors.darkBlue}
          >
            Avançar
          </Button>
        </ButtonWrapper>
      </FormBox>
    </SimulationBox>
  );
};

export default withTheme(LoanValue);
