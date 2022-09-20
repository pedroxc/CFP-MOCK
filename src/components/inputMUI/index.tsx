/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { BaseTextFieldProps } from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import {
  InputWrapper,
  CustomTextField,
} from './styles';

type IValueTextField = string | number | boolean;

interface IEvent {
  target?: {
    value: unknown;
  }
}

interface ITextFieldCustomProps extends BaseTextFieldProps {
  title: string;
  mask?: string,
  name: string;
  disabled?: boolean;
  value?: IValueTextField;
  onBlur?: () => void;
  onChange?: (event: IEvent) => void,
  width?: string;
  initialValue?: string;
}

const TextFieldCustom: React.FC<ITextFieldCustomProps> = ({
  title,
  mask,
  name,
  value,
  width,
  disabled = false,
  initialValue,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onBlur = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    fieldName, defaultValue, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputWrapper size={width}>
      {!!mask && (
      <InputMask
        mask={mask}
        disabled={disabled}
        onBlur={onBlur}
        defaultValue={defaultValue || initialValue}
      >
        {() => (
          <CustomTextField
            name={fieldName}
            style={{ width: '100%' }}
            inputRef={inputRef}
            error={!!error}
            label={title}
            value={value}
            variant="outlined"
            helperText={error}
            {...rest}
          />
        )}
      </InputMask>
      )}
      {!mask && (
      <CustomTextField
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        name={fieldName}
        style={{ width: '100%' }}
        inputRef={inputRef}
        error={!!error}
        label={title}
        value={value}
        defaultValue={defaultValue || initialValue}
        variant="outlined"
        helperText={error}
        {...rest}
      />
      )}
    </InputWrapper>
  );
};

export default TextFieldCustom;
