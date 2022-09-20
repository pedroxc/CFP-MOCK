/* eslint-disable camelcase */
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import masks from '../../utils/masks';
import { InfoContainer, InfoText, InfoWrapper } from './styles';

interface CardInfoProps {
  data: {
    employee_name: string,
    employee_cpf: string,
    employee_registration_number: string,
    simulation_total_value: string,
    simulation_quant_plots: string,
    simulation_plot_value: string,
    company_name: string,
    company_common_name: string,
  }
}

const CardSolicitationInfo: React.FC<CardInfoProps> = ({
  data,
}) => (
  <InfoWrapper>
    <InfoContainer>
      <InfoText color="black">{`Funcionário: ${data?.employee_name}`}</InfoText>
      <InfoText>{`Empresa: ${data?.company_common_name || data?.company_name}`}</InfoText>
      <InfoText>{`CPF: ${masks.formatCpf(data?.employee_cpf)}`}</InfoText>
      <InfoText>{`Matrícula: ${data?.employee_registration_number}`}</InfoText>
    </InfoContainer>
    <InfoContainer>
      <InfoText>
        {'Valor: R$ '}
        <CurrencyFormat
          fixedDecimalScale
          decimalScale={2}
          value={data?.simulation_total_value}
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
        />
      </InfoText>
      <InfoText>{`Prazo: ${data?.simulation_quant_plots}`}</InfoText>
      <InfoText>
        {'Valor da parcela: R$ '}
        <CurrencyFormat
          fixedDecimalScale
          decimalScale={2}
          value={data?.simulation_plot_value}
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
        />
      </InfoText>
    </InfoContainer>
  </InfoWrapper>
);

export default CardSolicitationInfo;
