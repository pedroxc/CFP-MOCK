import React, { useState } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { MenuItem } from '@material-ui/core/';
import ModalSimulationGrid from '../utils/modalSimullationGrid';
import Button from '../../../components/button';
import { createPaymentSplitContaFuturo } from '../../../services/Simulation';
import { initDate } from '../utils';
import { toastError } from '../../../utils/toast/config';
import messages from '../../../utils/toast/messages';

import {
  PlotNumberWrapper,
  SimulationBox,
  Title,
  OptionWrapper,
  PlotSelectedTitle,
  PlotSelectedDetails, ButtonWrapper,
  FilterContainer, SelectWarpper,
  CustomSelect,
} from '../styles';

interface ICpfConsultprops {
  theme: DefaultTheme;
  handleNext(step: string): void;
  changeData: any;
  simulationData: ISimulationData;
  handleLoading: (setLoading: boolean,) => void;
  changeStep: any;
  clearData: () => void;
  changePaymentData: (
    nameAssignor: string,
    cnpjAssignor: string,
    bankMatched: IBankMatched,
    valueDocument: number,
    paymentDate: string,
    barcodeValue: string,
    typeTitle: string,
    integerValueDocument: number,
  ) => void;
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
  gridPlot: any,
  gridPlotSelected: any,
  employeeId: string,
  companyEmails: any,
  simulationId: string,
  employeeName: string,
  employeePhone: string,
  companyPaymentDate: string,
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
const CpfConsult: React.FC<ICpfConsultprops> = ({
  changeData, theme, handleNext, simulationData, changeStep,
  clearData, changePaymentData, handleLoading,
}) => {
  const [modal, setModal] = useState(false);
  function handleChange(selectedData: any): void {
    const selected = simulationData.gridPlot.find((item: any) => item.numParcelas === selectedData);
    changeData('gridPlotSelected', selected);
  }
  const plotOptions = simulationData.gridPlot.map((item: any) => ({
    label: item.numParcelas,
    value: item.numParcelas,
  }));
  const handleSubmit = async (): Promise<void> => {
    try {
      setModal(true);
      let id;
      const cnpj = simulationData.cnpjAssignor.match(/\d+/g)?.join('');

      if (simulationData.hasPayment && simulationData.barcodeValue) {
        const responsePaymentSplis = await createPaymentSplitContaFuturo({
          digitableLine: simulationData.barcodeValue,
          paymentDay: initDate(simulationData.paymentDate, '/'),
          bankNumber: simulationData.bankMatched.value,
          nameAssignor: simulationData.nameAssignor,
          documentValue: Math.trunc(simulationData.integerValueDocument),
          cnpjAssignor: cnpj,
        });
      }
    } catch (e) {
      toastError(messages.simulation.gridPlotError);
    }
  };

  return (
    <SimulationBox>
      {modal && (
        <ModalSimulationGrid
          handleNext={handleNext}
          simulationData={simulationData}
          modal={modal}
          setModal={setModal}
          clearData={clearData}
          changePaymentData={changePaymentData}
          changeData={changeData}
          handleLoading={handleLoading}
        />
      )}
      <Title>Escolha a quantidade de parcelas </Title>
      <SelectWarpper>
        <FilterContainer variant="outlined">
          <CustomSelect
            onChange={(e) => handleChange(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: 10,
                  height: '300px',
                },
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
          >
            {plotOptions?.map((item: any) => (
              <MenuItem key={item.value} value={item.value} style={{ fontSize: 14 }}>
                {item.label}
              </MenuItem>
            ))}
          </CustomSelect>

        </FilterContainer>
      </SelectWarpper>
      <PlotNumberWrapper>
        <OptionWrapper>
          <PlotSelectedTitle>Quantidade De Parcelas: </PlotSelectedTitle>
          <PlotSelectedDetails>
            {simulationData.gridPlotSelected?.numParcelas
              ? simulationData.gridPlotSelected.numParcelas
              : 0}
          </PlotSelectedDetails>
        </OptionWrapper>
        <OptionWrapper>
          <PlotSelectedTitle>Valor da Parcelas: </PlotSelectedTitle>
          <PlotSelectedDetails>
            R$
            {' '}
            {simulationData.gridPlotSelected?.vlParcela
              ? simulationData.gridPlotSelected.vlParcela
              : 0}
          </PlotSelectedDetails>
        </OptionWrapper>
        <OptionWrapper>
          <PlotSelectedTitle>Juros Mês: </PlotSelectedTitle>
          <PlotSelectedDetails>
            {' '}
            {simulationData.gridPlotSelected?.percFeesYearly
              ? simulationData.gridPlotSelected.percFeesYearly
              : 0}
            %
          </PlotSelectedDetails>
        </OptionWrapper>
      </PlotNumberWrapper>

      <ButtonWrapper>
        <Button
          background={theme.colors.lightGray}
          width="220px"
          className="backbutton"
          type="button"
          onClick={() => {
            changeData('loanValue', 0);
            changeData('gridPlotSelected', {});
            changeStep(steps.third);
          }}
        >
          voltar
        </Button>
        <Button
          width="350px"
          onClick={handleSubmit}
          type="submit"
          background={theme.colors.darkBlue}
        >
          Avançar
        </Button>
      </ButtonWrapper>

    </SimulationBox>
  );
};

export default withTheme(CpfConsult);
