/* eslint-disable camelcase */
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { calcDateDiff } from '../../utils/calcDate';
import masks from '../../utils/masks';
import { InfoContainer, InfoText, InfoWrapper } from './styles';

interface CardInfoProps {
  data: {
    name: string,
    cpf: string,
    registration_number: string,
    phone: string,
    salary: string,
    admission_date: string,
    company: {
      name: string,
      common_name: string,
    },
    user: {
      email: string,
    },
  }
}

const CardEmployeeInfo: React.FC<CardInfoProps> = ({
  data,
}) => (
  <InfoWrapper>
    <InfoContainer>
      <InfoText color="black">{`Funcionário: ${data?.name}`}</InfoText>
      <InfoText>{`Empresa: ${data?.company?.common_name || data?.company?.name}`}</InfoText>
      <InfoText>{`CPF: ${masks.formatCpf(data?.cpf)}`}</InfoText>
      <InfoText>{`Matrícula: ${data?.registration_number}`}</InfoText>
    </InfoContainer>
    <InfoContainer>
      <InfoText>{`Telefone: ${masks.formatPhone(data?.phone)}`}</InfoText>
      <InfoText>{`Email: ${data?.user?.email}`}</InfoText>
      <InfoText>
        {'Salário: R$ '}
        <CurrencyFormat
          fixedDecimalScale
          decimalScale={2}
          value={data?.salary}
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
        />
      </InfoText>
      <InfoText>
        {`Tempo de empresa: ${calcDateDiff(new Date(), new Date(data?.admission_date))}`}
      </InfoText>
    </InfoContainer>
  </InfoWrapper>
);

export default CardEmployeeInfo;
