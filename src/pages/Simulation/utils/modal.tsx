import React, { useRef, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import InputMask from 'react-input-mask';
import { withTheme, DefaultTheme } from 'styled-components';
import { paymentSimulationSchema } from '../../../utils/validations/loanSimulation';
import { ISimulation } from '../../../models/ISimulation';
import Input from '../../../components/input';
import Modal from '../../../components/Modal';
import { bankValues, formatDateToBrazilDate } from '.';
import Button from '../../../components/button';
import { toastError, toastSuccess } from '../../../utils/toast/config';
import messages from '../../../utils/toast/messages';

import {
  ModalContainer, FormWrapper, InputWrapper, FieldsWarning, ButtonContainer,
} from '../styles';

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

interface IDocumentValue {
  bank: string;
  cnpj: string;
  documentNumber: string;
  name: string;
  paymentData: string;
  paymentDate: string;
  paymentValue: number;
  titleType: string;
}

interface ImodalPaymentprops {
  theme: DefaultTheme,
  modal: boolean,
  setModal: any,
  simulationData: ISimulation | ISimulationData,
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

const ModalPayment: React.FC<ImodalPaymentprops> = ({
  theme, modal, setModal, changePaymentData, simulationData, handleLoading,
}) => {
  const [bankLabel, setBankLabel] = useState(simulationData.bankMatched);
  const [typeTitle, setTypeTitle] = useState(simulationData.typeTitle);
  const [paymentValue, setPaymentValue] = useState(simulationData.valueDocument);
  const [paymentDate, setPaymentDate] = useState(simulationData.paymentDate);

  const formRef = useRef<FormHandles>(null);

  const handleDocumentNumber = (documentNumber: string): void => {
    const qtdOfNumbers = documentNumber.replace(/[^0-9]/g, '').length;
    if (qtdOfNumbers === 47) {
      const bankCode = documentNumber.substring(0, 3);
      const ballotValueDocument = parseFloat(documentNumber.substring(44, 52));
      const coinValueDocument = parseFloat(documentNumber.substring(52)) / 100;
      const valueDocument = ballotValueDocument + coinValueDocument;

      let stringValue;
      const coinValueString = coinValueDocument.toString();
      if (coinValueDocument && ballotValueDocument) {
        stringValue = ballotValueDocument.toString()
          + coinValueString.substr(coinValueString.length - 2);
      }

      const baseDate = new Date('1997-10-07');
      const barcodeDays = documentNumber.substring(40, 44);

      baseDate.setDate(baseDate.getDate() + parseInt(barcodeDays, 10));

      let bankMatched = { label: '', value: '' };
      bankValues.forEach((bankValue) => {
        if (bankValue.value === bankCode) {
          bankMatched = bankValue;
          setBankLabel(bankMatched);
        }
      });
      const paymentDateformated = formatDateToBrazilDate(baseDate);
      setTypeTitle('Título Bancário');
      setPaymentValue(valueDocument);
      setPaymentDate(paymentDateformated);
    }

    if (qtdOfNumbers !== 47) {
      changePaymentData(
        '',
        '',
        { value: '', label: '' },
        0,
        '',
        '',
        '',
        0,
      );
    }
  };

  const handleDocumentSubmit = useCallback(
    async (data: IDocumentValue) => {
      handleLoading(false);
      try {
        formRef.current?.setErrors({});
        await paymentSimulationSchema.validate(data, {
          abortEarly: false,
        });

        const bankData = bankValues.find((item) => item.label === data.bank);
        changePaymentData(
          data.name,
          data.cnpj,
          { value: bankData?.value || '', label: bankData?.label || '' },
          data.paymentValue,
          data.paymentDate,
          data.documentNumber,
          data.titleType,
          data.paymentValue * 100,
        );
        toastSuccess(messages.simulation.paymentModalSuccess);
        handleLoading(false);
        setModal(false);
      } catch (e) {
        handleLoading(false);
        toastError(messages.simulation.paymentModalError);
      }
    }, [],
  );

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);
  return (

    <Modal
      close={() => closeModal()}
      isOpen={modal}
    >

      <ModalContainer>

        <FormWrapper>
          <h1>Informações do boleto</h1>
          <Form ref={formRef} onSubmit={handleDocumentSubmit}>
            <InputWrapper>
              <span>Linha digitável *</span>
              <InputMask
                onChange={(e) => handleDocumentNumber(e.target.value)}
                defaultValue={simulationData.barcodeValue}
                mask="99999.99999 99999.999999 99999.999999 9 99999999999999"
              >
                {(inputProps: any) => (
                  <Input
                    {...inputProps}
                    name="documentNumber"
                    placeholder="Digite o código de barras"
                  />
                )}

              </InputMask>
            </InputWrapper>
            <InputWrapper>
              <span>Nome Cedente/Beneficiário *</span>
              <Input
                title="Nome Cedente/Beneficiário"
                name="name"
                defaultValue={simulationData.nameAssignor}
                placeholder="Nome Cedente/Beneficiário"
                required
              />
            </InputWrapper>
            <InputWrapper>
              <span>CNPJ Cedente/Beneficiário *</span>
              <InputMask
                mask="99.999.999/9999-99"
                defaultValue={simulationData.cnpjAssignor}
              >
                {(inputProps: any) => (
                  <Input
                    {...inputProps}
                    name="cnpj"
                    title="CNPJ Cedente/Beneficiário"
                    required
                  />
                )}
              </InputMask>
            </InputWrapper>
            <InputWrapper>
              <span>Banco</span>
              <Input
                defaultValue={simulationData.bankMatched.label}
                disabled
                title="Banco"
                name="bank"
                value={bankLabel.label}
              />
            </InputWrapper>
            <InputWrapper>
              <span>Tipo Título</span>
              <Input
                defaultValue={simulationData.typeTitle}
                title="Tipo do Título"
                disabled
                name="titleType"
                value={typeTitle}
              />
            </InputWrapper>
            <InputWrapper>
              <span>Valor</span>
              <Input
                defaultValue={simulationData.valueDocument}
                disabled
                name="paymentValue"
                title="valor"
                value={paymentValue}
              />
            </InputWrapper>
            <InputWrapper>
              <span>Vencimento</span>
              <InputMask
                defaultValue={simulationData.paymentDate}
                disabled
                mask="99/99/9999"
                placeholder="Vencimento"
                value={paymentDate}
              >
                {(inputProps: any) => (
                  <Input
                    {...inputProps}
                    name="paymentDate"
                  />
                )}
              </InputMask>
            </InputWrapper>
            <FieldsWarning>* Preencher campos obrigatórios</FieldsWarning>
            <ButtonContainer>
              <Button
                type="submit"
                background={theme.colors.darkBlue}
              >
                Adicionar
              </Button>
            </ButtonContainer>
          </Form>
        </FormWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default withTheme(ModalPayment);
