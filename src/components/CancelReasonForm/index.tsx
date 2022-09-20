import React, {
  useCallback,
  useRef,
} from 'react';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';
import { withTheme, DefaultTheme } from 'styled-components';
import InputMUI from '../inputMUI';
import Button from '../button';
import {
  FormBox,
  ButtonWrapper,
  FormTitle,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { refuseReasonSchema } from '../../utils/validations/refuseReason';
import { refuseSolicitation } from '../../services/Solicitations';

interface CancelReasonProps {
  requestInfo?: {
    solicitationId: string;
    userId: string;
  } | null,
  theme: DefaultTheme,
  handleSuccess: VoidFunction;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const CancelReasonForm: React.FC<CancelReasonProps> = ({
  requestInfo, handleSuccess, theme, setLoading, loading,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: { message: string }) => {
      setLoading(true);
      const formattedData = { message: data.message.trim() };
      try {
        formRef.current?.setErrors({});
        await refuseReasonSchema.validate(formattedData, {
          abortEarly: false,
        });

        const { data: result } = await refuseSolicitation(
          requestInfo?.solicitationId || '',
          requestInfo?.userId || '',
          formattedData.message,
        );
        if (result?.status) {
          handleSuccess();
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

  return (
    <FormBox ref={formRef} onSubmit={handleSubmit}>
      <FormTitle>Inserir motivo</FormTitle>
      <InputMUI
        title=""
        name="message"
        multiline
        minRows={5}
        maxRows={5}
      />
      <ButtonWrapper>
        <Button
          disabled={loading}
          type="submit"
          background={theme.colors.darkBlue}
        >
          Enviar
        </Button>
      </ButtonWrapper>
    </FormBox>
  );
};

export default withTheme(CancelReasonForm);
