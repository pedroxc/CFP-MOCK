import React, {
  useCallback, useRef,
} from 'react';
import * as yup from 'yup';
import { withTheme, DefaultTheme } from 'styled-components';
import { FormHandles } from '@unform/core';
import { formatCurrency } from '@brazilian-utils/brazilian-utils';
import { browserName, isMobile } from 'react-device-detect';
import { signSolicitation } from '../../services/Solicitations';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import { reLoginSchema } from '../../utils/validations/auth';
import masks from '../../utils/masks';
import {
  Title,
  ButtonWrapper,
  FormBox,
  CoinsImage,
  Container,
  DetailsRow,
  Label,
  Value,
  InfoWrapper,
  LoanDetails,
} from './styles';
import Button from '../button';
import InputMui from '../inputMUI';

interface IModal {
  data: any;
  theme: DefaultTheme;
  handleSuccess: () => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}
interface SignInDataObject {
  email: string;
  password: string;
}

const SignSolicitation: React.FC<IModal> = ({
  data, theme, handleSuccess, setLoading, loading,
}) => {
  const { resignIn, userEmail } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const signProposal = async (): Promise<void> => {
    const response = await signSolicitation(data.employee_id,
      data.solicitation,
      data.solicitation_codigo_proposta_mp,
      '000.000.0.0', browserName, isMobile);
    if (response?.data?.Result) {
      handleSuccess();
    }
    setLoading(false);
  };

  const handleSubmitLogin = useCallback(
    async (formData: SignInDataObject) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        await reLoginSchema.validate(formData, {
          abortEarly: false,
        });

        const { status } = await resignIn({ email: userEmail, password: formData.password });

        if (status === 'logged') {
          signProposal();
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (error instanceof yup.ValidationError) {
          const erros = getValidationErrors(error);
          formRef.current?.setErrors(erros);
        }
      }
    },
    [resignIn],
  );

  return (
    <Container>
      <CoinsImage />
      <Title>Confirmação de empréstimo</Title>
      <LoanDetails>
        <DetailsRow>
          <InfoWrapper>
            <Label>Valor solcitado</Label>
            <Value>
              R$
              {' '}
              {formatCurrency(
                data.simulation_total_value_credit,
              )}
            </Value>
          </InfoWrapper>

          <InfoWrapper>
            <Label>Juros/CET a.m</Label>
            <Value>{`${data.simulation_perc_fees_yearly}%/${data.simulation_perc_fees_monthly}%`}</Value>
          </InfoWrapper>
        </DetailsRow>

        <DetailsRow>
          <InfoWrapper>
            <Label>Forma de Pagamento</Label>
            <Value>
              {`${data.simulation_quant_plots}x
                de R$ ${formatCurrency(Number(data?.simulation_plot_value))}`}
            </Value>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Valor Total</Label>
            <Value>
              R$
              {formatCurrency(
                Number(data.simulation_total_value_debt),
              )}
            </Value>
          </InfoWrapper>
        </DetailsRow>

        <DetailsRow>
          <InfoWrapper>
            <Label>Data de Pagamento</Label>
            <Value>
              {masks.formarDate(
                data.solicitation_first_due_date,
              )}

            </Value>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Modalidade</Label>
            <Value>Desconto em folha</Value>
          </InfoWrapper>
        </DetailsRow>
      </LoanDetails>
      <FormBox ref={formRef} onSubmit={handleSubmitLogin}>
        <InputMui
          name="password"
          title="Senha"
          type="password"
        />
        <ButtonWrapper>
          <Button
            disabled={loading}
            type="submit"
            background={theme.colors.darkBlue}
            width="250px"
          >
            Assinar
          </Button>
        </ButtonWrapper>
      </FormBox>
    </Container>
  );
};

export default withTheme(SignSolicitation);
