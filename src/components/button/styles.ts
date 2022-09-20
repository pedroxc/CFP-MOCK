import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IButtonProps {
  background: string;
  textColor?: string;
  borderColor?: string;
  right?: boolean;
  width?: string;
}

export const Container = styled.button<IButtonProps>`
  background: ${(props) => props.background};
  width: ${(props) => props.width || '100%'};
  border-width: 1px;
  border-color: transparent;
  font-family: Poppins;
  border-style: solid;
  font-style: normal;
  font-weight: 400;
  border-radius: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.textColor || 'white'};
  top: 50%;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => shade(0.2, props.background)};
  }

  ${(props) => props.right
    && css`
      flex-direction: row-reverse;
    `}

  ${(props) => props.borderColor
    && css`
      border-color: ${props.borderColor};
    `}
`;
