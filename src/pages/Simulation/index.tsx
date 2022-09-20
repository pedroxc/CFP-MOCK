import React, { useState, useEffect, useCallback } from 'react';
import { number } from 'yup/lib/locale';
import { getStorage } from '../../utils/storage';
import storage from '../../utils/storage/keys';
import LoadingPage from '../LoadingPage';
import CpfConsult from './CpfConsult';
import SimulationGrid from './SimulationGrid';
import PaymentDetails from './PaymentDetails';
import LoanValue from './LoanValue';
import { initialState } from './utils';
import { Container, Title, PageWrapper } from './styles';
import { ISimulation } from '../../models/ISimulation';

const steps = {
  main: 'CpfConsult',
  second: 'PaymentDetails',
  third: 'LoanValue',
  forth: 'gridPlot',
};

interface IBankMatched {
  label: string;
  value: string;
}

const Simulation: React.FC = () => {
  const [stepName, setStepName] = useState(steps.main);
  const [data, setData] = useState(initialState);
  const [loading, handleLoading] = useState(false);

  const changeStep = useCallback((step: string) => {
    setStepName(step);
  }, []);
  const changeDataKeyValue = (key: string, value: any): void => {
    setData({ ...data, [key]: value });
  };
  const clearData = (): void => {
    setData(initialState);
    setStepName(steps.main);
  };
  const changeEmployeeData = (cpf: string,
    limitAvailable: number,
    companyPaymentDate: string, employeeId: string,
    employeeName: string, companyEmails: any): void => {
    setData({
      ...data, cpf, limitAvailable, companyPaymentDate, employeeId, employeeName, companyEmails,
    });
  };
  const changleUserData = (employeeEmail: string, employeePhone: string): void => {
    setData({ ...data, employeeEmail, employeePhone });
  };
  const changeRequestValue = (loanValue: number, requestValue: number): void => {
    setData({ ...data, loanValue, requestValue });
  };

  const changePaymentData = (
    nameAssignor: string,
    cnpjAssignor: string,
    bankMatched: IBankMatched,
    valueDocument: number,
    paymentDate: string,
    barcodeValue: string,
    typeTitle: string,
    integerValueDocument: number,
  ): void => {
    setData({
      ...data,
      nameAssignor,
      cnpjAssignor,
      bankMatched,
      valueDocument,
      paymentDate,
      barcodeValue,
      typeTitle,
      integerValueDocument,
    });
  };

  return (
    <>
      {loading && <LoadingPage />}
      <Container>
        <Title>Simular Emprestimo</Title>
        <PageWrapper>

          {stepName === steps.main && (
            <CpfConsult
              handleLoading={handleLoading}
              handleNext={(step) => changeStep(step)}
              changeData={changeDataKeyValue}
              changeEmployeeData={changeEmployeeData}
              simulationData={data}
            />
          )}
          {stepName === steps.second && (
            <PaymentDetails
              handleNext={(step) => changeStep(step)}
              changeData={changeDataKeyValue}
              changeStep={setStepName}
              changePaymentData={changePaymentData}
              simulationData={data}
              changleUserData={changleUserData}
              handleLoading={handleLoading}
            />
          )}
          {stepName === steps.third && (
            <LoanValue
              handleNext={(step) => changeStep(step)}
              changeData={changeDataKeyValue}
              changeRequestValue={changeRequestValue}
              simulationData={data}
              handleLoading={handleLoading}
              changeStep={setStepName}

            />
          )}
          {stepName === steps.forth && (
            <SimulationGrid
              changeStep={setStepName}
              handleNext={(step) => changeStep(step)}
              changeData={changeDataKeyValue}
              simulationData={data}
              handleLoading={handleLoading}
              clearData={clearData}
              changePaymentData={changePaymentData}
            />
          )}
        </PageWrapper>
      </Container>
    </>
  );
};

export default Simulation;
