import styled from 'styled-components';
import { Select } from '@material-ui/core/';

export const CustomSelect = styled(Select)`
  width: 100px;
  text-align: center;

  .MuiSelect-select {
    text-transform: captalize;
    font-size: 14px;
    &:focus {
      background: transparent;
    }
  }
`;

export const FilterContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 0;

  svg {
    color: ${(props) => props.theme.colors.darkBlue};
  }
`;

export const Label = styled.div`
  font-size: 14px;
  padding-right: 5px;
  color: ${(props) => props.theme.colors.darkBlue};
`;
