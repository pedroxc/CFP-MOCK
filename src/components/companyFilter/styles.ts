import styled from 'styled-components';
import { Select, FormControl } from '@material-ui/core/';

export const CustomSelect = styled(Select)`
  border-radius: 10px;
  div {
    color: ${(props) => props.theme.colors.darkBlue};
  }
  .MuiSelect-select {
    text-transform: uppercase;
    padding-right: 13px !important;
    padding: 13px 18px;

    &:focus {
      background: transparent;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.darkBlue} !important;
  }
`;

export const FilterContainer = styled(FormControl)`
  label {
    color: ${(props) => props.theme.colors.darkBlue} !important;
  }
  svg {
    color: ${(props) => props.theme.colors.darkBlue};
  }
`;
