import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import { withTheme, DefaultTheme } from 'styled-components';
import { SelectProps, MenuItem } from '@material-ui/core';
import InputMUI from '../inputMUI';
import Button from '../button';
import {
  FormBox,
  ButtonWrapper,
  FormTitle,
  InputGroup,
} from './styles';
import { IBankDetails } from '../../models/IBankDetails';
import getValidationErrors from '../../utils/getValidationErrors';
import { bankDetailsSchema } from '../../utils/validations/bankDetails';
import { updateBankDetails } from '../../services/Solicitations';
import { updateEmployeeBankDetails } from '../../services/Employee';

interface EditBankDetailsProps {
  requestInfo?: {
    employeeId: string;
    proposalCode?: string;
    bankDetails?: IBankDetails;
  } | null,
  theme: DefaultTheme,
  handleSuccess: VoidFunction;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

interface IEvent {
  target?: {
    value: unknown;
  }
}

const EditBankDetailsForm: React.FC<EditBankDetailsProps> = ({
  requestInfo, handleSuccess, theme, setLoading, loading,
}) => {
  const [typeAccountSelected, setTypeAccountSelected] = useState('');
  const formRef = useRef<FormHandles>(null);
  const typesAccount = {
    savings: 'Poupança',
    checkingAccount: 'Conta-corrente',
  };

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

  const handleSubmit = useCallback(
    async (data: IBankDetails) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        await bankDetailsSchema.validate(data, {
          abortEarly: false,
        });
        if (!requestInfo?.proposalCode) {
          const response = await updateEmployeeBankDetails(
            requestInfo?.employeeId || '',
            data,
          );
          if (response?.data) {
            handleSuccess();
          }
        } else {
          const response = await updateBankDetails(
            requestInfo?.proposalCode || '',
            data,
            requestInfo?.employeeId || '',
          );
          if (response?.data) {
            handleSuccess();
          }
        }
        setLoading(false);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
        setLoading(false);
      }
    }, [handleSuccess, requestInfo, setLoading],
  );

  const handleChangeModality = ({ target }: IEvent) => {
    const value = String(target?.value);
    formRef?.current?.setFieldValue('type_account', value);
    setTypeAccountSelected(value || '');
  };

  useEffect(() => {
    if (requestInfo?.bankDetails) {
      formRef.current?.setData(requestInfo?.bankDetails);
      setTypeAccountSelected(requestInfo?.bankDetails.type_account);
    }
  }, [requestInfo?.bankDetails]);

  return (
    <FormBox ref={formRef} onSubmit={handleSubmit}>
      <FormTitle>Dados bancários</FormTitle>
      <InputMUI
        select
        value={typeAccountSelected || ''}
        title="Tipo de conta"
        name="type_account"
        onChange={handleChangeModality}
        SelectProps={selectsConfig}
      >
        <MenuItem value="1">{typesAccount.savings}</MenuItem>
        <MenuItem value="2">{typesAccount.checkingAccount}</MenuItem>
      </InputMUI>
      <InputMUI title="Código do banco" name="code_bank" type="number" />
      <InputMUI title="Agência" name="agency" type="number" />
      <InputGroup>
        <InputMUI title="Conta" name="account" type="number" width="big" />
        <InputMUI title="Dígito" name="digit_account" type="number" width="small" />
      </InputGroup>
      <ButtonWrapper>
        <Button
          disabled={loading}
          type="submit"
          background={theme.colors.darkBlue}
        >
          Salvar
        </Button>
      </ButtonWrapper>
    </FormBox>
  );
};

export default withTheme(EditBankDetailsForm);
