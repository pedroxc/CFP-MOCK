import React, {
  useEffect, useState, useCallback,
} from 'react';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { withTheme, DefaultTheme } from 'styled-components';
import Button from '../../../components/button';
import { useAuth } from '../../../hooks/auth';
import Modal from '../../../components/Modal';
import { toastError, toastSuccess } from '../../../utils/toast/config';
import messages from '../../../utils/toast/messages';
import { createSimulationContaFuturo, createSolicitationContaFuturo, sendEmailToRhSolicitation } from '../../../services/Simulation';

import {
  ModalContainer, CoinsImage, LoanDetails, DetailsRow, InfoWrapper, Label, Value, ButtonContainer,
} from '../styles';

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

interface ImodalGridPlotProps {
  theme: DefaultTheme,
  handleNext: any;
  modal: boolean,
  setModal: any,
  changeData: any,
  simulationData: ISimulationData,
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
  handleLoading: (setLoading: boolean,) => void;

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
const ModalSimulationGrid: React.FC<ImodalGridPlotProps> = ({
  clearData,
  theme, modal, setModal, simulationData, changePaymentData,
  changeData, handleNext, handleLoading,
}) => {
  const { userId } = useAuth();
  const [id, setId] = useState(simulationData.simulationId);
  const { requestValue } = simulationData;

  const closeModal = useCallback(() => {
    setModal(false);
    handleLoading(false);
  }, []);
  const createSimulation = async (): Promise<void> => {
    try {
      const responseSimulation = await createSimulationContaFuturo(
        simulationData.gridPlotSelected,
        simulationData.requestValue,
        simulationData.employeeId,
        simulationData.simulationId || undefined,
        simulationData.hasPayment,
      );
      setId(responseSimulation.data.id);
      changeData('simulationId', id);
    } catch (e) {
      toastError(messages.simulation.gridPlotError);
    }
  };
  useEffect(() => {
    createSimulation();
  }, []);
  const acceptLoan = async (): Promise<void> => {
    try {
      handleLoading(true);
      const responseSolicitation = await createSolicitationContaFuturo({
        activate: true,
        status: 'ANALYZE',
        type: 'LOAN',
        device: 'desktop',
        simulationId: id,
        userRequesterId: userId,
      });
      if ('statusError' in responseSolicitation) {
        return;
      }

      if (simulationData.companyEmails.length > 0) {
        await Promise.all(
          simulationData.companyEmails.map(async (item: any) => {
            await sendEmailToRhSolicitation(item.email, simulationData.employeeName);
          }),
        );
      }
      closeModal();
      toastSuccess(messages.simulation.loanSuccess);
      handleNext(steps.main);
      changePaymentData('', '', { label: '', value: '' }, 0, '', '', '', 0);
      clearData();
    } catch (error) {
      handleLoading(false);
      toastError(messages.simulation.gridPlotError);
    }
  };

  return (

    <Modal
      close={() => closeModal()}
      isOpen={modal}
    >

      <ModalContainer className="SimulationGrid">
        <CoinsImage />
        <h1>Confirmação de empréstimo</h1>
        <LoanDetails>
          <DetailsRow>
            <InfoWrapper>
              <Label>Valor solcitado</Label>
              <Value>
                R$
                {' '}
                {formatCurrency(
                  requestValue,
                )}
              </Value>
            </InfoWrapper>

            <InfoWrapper>
              <Label>Juros/CET a.m</Label>
              <Value>{`${simulationData.gridPlotSelected.percFeesYearly}%/${simulationData.gridPlotSelected.percCETMonthly}%`}</Value>
            </InfoWrapper>
          </DetailsRow>

          <DetailsRow>
            <InfoWrapper>
              <Label>Forma de Pagamento</Label>
              <Value>
                {`${simulationData.gridPlotSelected.numParcelas}
                  x de R$ ${formatCurrency(Number(simulationData.gridPlotSelected.vlParcela))}`}

              </Value>
            </InfoWrapper>
            <InfoWrapper>
              <Label>Valor Total</Label>
              <Value>
                R$
                {' '}
                {formatCurrency(Number(simulationData.gridPlotSelected.totalValueDebt))}
              </Value>
            </InfoWrapper>
          </DetailsRow>

          <DetailsRow>
            <InfoWrapper>
              <Label>Data de Pagamento</Label>
              <Value>{simulationData.companyPaymentDate}</Value>
            </InfoWrapper>
            <InfoWrapper>
              <Label>Modalidade</Label>
              <Value>Desconto em folha</Value>
            </InfoWrapper>
          </DetailsRow>
        </LoanDetails>
        <ButtonContainer>
          <Button
            background={theme.colors.darkBlue}
            type="button"
            onClick={acceptLoan}
          >
            Confirmo
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default withTheme(ModalSimulationGrid);
