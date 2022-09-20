import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background: string;
  textColor?: string;
  icon?: React.ElementType;
  right?: boolean;
  borderColor?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  background,
  icon: Icon,
  textColor,
  borderColor,
  right,
  width,
  ...rest

}) => (
  <Container
    background={background}
    type="button"
    right={right}
    borderColor={borderColor}
    textColor={textColor}
    width={width}
    {...rest}
  >
    {Icon && <Icon />}
    {children}
  </Container>
);

export default Button;
