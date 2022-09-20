/* eslint-disable react/jsx-no-bind */
import React, {
  useCallback, useState, useRef,
} from 'react';
import * as yup from 'yup';
import { withTheme, DefaultTheme } from 'styled-components';
import { MenuItem } from '@material-ui/core/';
import InputMask from 'react-input-mask';
import { FormHandles } from '@unform/core';
import { ISimulation } from '../../../models/ISimulation';
import getValidationErrors from '../../../utils/getValidationErrors';
import { paymentOptions } from '../utils';
import Button from '../../../components/button';
import Modal from '../utils/modal';
import InputMui from '../../../components/inputMUI';

import {
  Title, ButtonWrapper, SimulationBox, SelectWarpper, FormBox,
  FilterContainer, CustomSelect,
} from '../styles';

interface Itens {
  label: string;
  value: string;
}

interface IBankMatched {
  label: string;
  value: string;
}

interface ISimulationData {
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
}
interface ICpfConsultprops {
  theme: DefaultTheme;
  changeData: any;
  handleNext(step: string): void;
  changeStep: any;
  simulationData: ISimulation | ISimulationData;
  changleUserData: (
    email: string,
    phone: string,
  ) => void;
  handleLoading: (setLoading: boolean,) => void;
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
const steps = {
  main: 'CpfConsult',
  second: 'PaymentDetails',
  third: 'LoanValue',
  forth: 'gridPlot',
};

const PaymentDetails: React.FC<ICpfConsultprops> = ({
  changleUserData, handleNext, theme, changeData, changeStep,
  changePaymentData, simulationData, handleLoading,
}) => {
  const [selectError, setSelectError] = useState(false);
  const [hasPayment, setHasPayment] = useState();
  const [modal, setModal] = useState(false);

  const handleHasPayment = useCallback(
    (payment: any): void => {
      setSelectError(false);
      setHasPayment(payment);
      changeData('hasPayment', payment === 'true');
    }, [],
  );
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ISimulation) => {
      try {
        if (!hasPayment) { setSelectError(true); } else {
          changleUserData(data.email, data.phone);
          handleNext(steps.third);
        }
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    }, [handleNext],
  );

  function handleModal(): void {
    setModal(true);
  }
  return (
    <SimulationBox>
      {modal && (
        <Modal
          simulationData={simulationData}
          modal={modal}
          setModal={setModal}
          changePaymentData={changePaymentData}
          handleLoading={handleLoading}
        />
      )}
      <Title> Quitação de divida?</Title>
      <SelectWarpper>
        <FilterContainer variant="outlined">
          <CustomSelect
            error={selectError}
            onChange={(e) => handleHasPayment(e.target.value)}
            MenuProps={{
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
            }}
          >
            {paymentOptions?.map((item: Itens) => (
              <MenuItem key={item.value} value={item.value} style={{ fontSize: 14 }}>
                {item.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </FilterContainer>
      </SelectWarpper>
      <SelectWarpper>
        <Button
          className="button"
          onClick={handleModal}
          disabled={!(hasPayment === 'true')}
          type="button"
          background={(hasPayment === 'true') ? theme.colors.darkBlue : theme.colors.lightGray}
        >
          Adicionar Boleto
        </Button>
      </SelectWarpper>
      <Title> Informar dados do usuário: </Title>
      <FormBox ref={formRef} onSubmit={handleSubmit}>
        <InputMui
          title="Email do cliente"
          name="email"
          placeholder="Email do cliente"
        />
        <InputMask
          mask="(99) 99999-9999"
        >
          {(inputProps: any) => (
            <InputMui
              {...inputProps}
              title="Telefone do cliente"
              name="phone"
              placeholder="Telefone do cliente"
            />
          )}
        </InputMask>
        <ButtonWrapper>
          <Button
            background={theme.colors.lightGray}
            width="220px"
            className="backbutton"
            type="button"
            onClick={() => {
              changeData('loanValue', 0);
              changeData('gridPlotSelected', {});
              changeStep(steps.main);
            }}
          >
            voltar
          </Button>
          <Button
            width="350px"
            type="submit"
            background={(!selectError === true) ? theme.colors.darkBlue : theme.colors.lightGray}

          >
            Avançar
          </Button>
        </ButtonWrapper>
      </FormBox>
    </SimulationBox>
  );
};

export default withTheme(PaymentDetails);
