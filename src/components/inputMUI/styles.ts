import styled from 'styled-components';
import { TextField } from '@material-ui/core';

interface InputProps {
  size?: string;
}

export const InputWrapper = styled.div<InputProps>`
  margin-bottom: 15px;
  width: ${(props) => {
    if (props.size === 'big') {
      return '56%';
    }

    if (props.size === 'mid') {
      return '48%';
    }

    if (props.size === 'small') {
      return '42%';
    }

    return '100%';
  }};
`;

export const CustomTextField = styled(TextField)`
  fieldset {
      border-radius: 15px;
    }
  & label.Mui-focused {
    color: ${(props) => props.theme.colors.auxPrimary};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${(props) => props.theme.colors.auxPrimary};;
    }
  }
`;
