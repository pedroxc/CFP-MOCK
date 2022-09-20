import {
  FC, InputHTMLAttributes, useEffect, useRef,
} from 'react';
import { useField } from '@unform/core';
import {
  InputWrapper, ErrorMessage, Container,
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
}

const Input: FC<InputProps> = ({
  name,
  label,
  ...rest
}) => {
  const inputRef = useRef(null);
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <InputWrapper>
        <input defaultValue={defaultValue} ref={inputRef} id={name} {...rest} />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default Input;
