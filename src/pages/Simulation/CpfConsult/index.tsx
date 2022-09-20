import React, {
  useCallback, useRef,
} from 'react';
import * as yup from 'yup';
import { withTheme, DefaultTheme } from 'styled-components';
import { FormHandles } from '@unform/core';
import moment from 'moment';
import { MenuItem } from '@material-ui/core/';
import { loanSimulationSchema } from '../../../utils/validations/loanSimulation';
import InputMui from '../../../components/inputMUI';
import masks from '../../../utils/masks';
import { ISimulation } from '../../../models/ISimulation';
import Button from '../../../components/button';
import { getLimitAvailable } from '../../../services/Simulation';
import getValidationErrors from '../../../utils/getValidationErrors';
import { serviceOptions } from '../utils';

import {
  FormBox, ButtonWrapper, SimulationBox, Title, CustomSelect, FilterContainer, SelectWarpper,
} from '../styles';

interface ICpfConsultprops {
  theme: DefaultTheme;
  handleNext(step: string): void;
  simulationData: ISimulationData | ISimulation;
  changeData: any,
  changeEmployeeData: (
    cpfTratado: string,
    limitAvailable: number,
    paymentDate: string,
    employeeId: string,
    employeeName: string,
    companyEmails: any,
  ) => void;
  handleLoading: (setLoading: boolean,) => void;
}
interface ISimulationData {
  attendanceType: string,
}
interface Itens {
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
  changeEmployeeData, theme, handleNext, simulationData, changeData, handleLoading,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ISimulation) => {
      try {
        handleLoading(true);
        formRef.current?.setErrors({});
        await loanSimulationSchema.validate(data, {
          abortEarly: false,
        });
        const { cpf } = data;
        const cpfTratado = cpf.replace(/[^a-zA-Z0-9 ]/g, '');
        const response = await getLimitAvailable(cpfTratado);
        const {
          limitAvailable, companyPaymentDate, employeeId, employeeName,
          companyEmails,
        } = response.data;
        const paymentDate = moment.utc(moment(companyPaymentDate).utc()).format(
          masks.date,
        );
        changeEmployeeData(cpfTratado,
          limitAvailable <= 0 ? 0 : limitAvailable,
          paymentDate,
          employeeId,
          employeeName,
          companyEmails);
        handleLoading(false);
        handleNext(steps.second);
      } catch (error) {
        handleLoading(false);
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    }, [handleNext],
  );
  return (

    <SimulationBox>
      <SelectWarpper>
        <Title> Tipo de atendimento: </Title>
        <FilterContainer variant="outlined">
          <CustomSelect
            onChange={(e) => changeData('attendanceType', e.target.value)}
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
            {serviceOptions?.map((item: Itens) => (
              <MenuItem key={item.value} value={item.value} style={{ fontSize: 14 }}>
                {item.label}
              </MenuItem>
            ))}
          </CustomSelect>

        </FilterContainer>
      </SelectWarpper>
      <FormBox ref={formRef} onSubmit={handleSubmit}>
        <InputMui
          title="CPF"
          name="cpf"
          mask={masks.cpf}
        />
        <ButtonWrapper>
          <Button
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

export default withTheme(CpfConsult);
