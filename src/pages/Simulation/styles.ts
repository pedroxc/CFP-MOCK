import styled from 'styled-components';
import CurrencyInput from 'react-currency-input';
import { Form } from '@unform/web';
import { Select, FormControl } from '@material-ui/core/';
import Coins from '../../assets/images/coins.png';

interface IButtonWrapper {
  freePosition?: boolean;
}

interface IRegisterBox {
  scroll?: boolean;
}

export const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  height: calc(100vh - 73px);
  padding:25px;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const PageWrapper = styled.div`
  padding:25px;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 22px;
  &.loanPage{
    font-weight: normal;
  font-size: 20px;
  }
`;
export const FormBox = styled(Form)`
  position: relative;
  height: 90%;
  margin-top: 20px;
`;

export const ButtonWrapper = styled.div<IButtonWrapper>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 48px;
  margin-top:15px;


`;
export const SelectWarpper = styled.div`
  display:flex;
  margin: 0  0 20px 0;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
}
.button{
  height: 32px;
  width:25%;

}`;

export const SimulationBox = styled.div<IRegisterBox>`
  background: white;
  display:flex;
  flex-direction:column;
  border-radius: 10px;
  width: 640px;
  box-shadow: 0px 1px 4px ${(props) => props.theme.colors.lightGray};
  max-height: 600px;
  position: relative;
  margin: 0 auto;
  padding: 25px;
  overflow-y: ${(props) => (props.scroll ? 'scroll' : 'unset')};

  @media(min-height: 800px) {
    max-height: ${(props) => (props.scroll ? '800px' : '640px')};
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 700px;
  padding: 10px 0;
  height: 800px;
  background-color: #fff;
  border-radius: 15px;

  h1 {
    font-size: 32px;
  }
  &.SimulationGrid{
  height: 500px;
  }
`;
export const FormWrapper = styled.div`
  margin-top: 10px;
  width: 500px;
`;
export const InputWrapper = styled.div`
  margin-bottom: 10px;
`;
export const FieldsWarning = styled.div`
  margin: 0.5rem 0;
`;
export const LimitAvailable = styled.h1`
  color: #000;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 40px;
`;
export const InputCustom = styled(CurrencyInput).attrs({
  disableUnderline: true,
  prefix: 'R$ ',
  decimalSeparator: ',',
  thousandSeparator: '.',
  maxLength: 13,
})`
  margin: 0 20px 20px 20px;
  text-align: center;
  color: '#000';
  font-size: 20px;
  border-bottom: 1px solid #dbdbdb;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;

  @media (max-width: 1000px) {
    margin: 0 10px;
  }
`;
export const PlotNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #edeffa;
  border-radius: 18px;
  padding: 50px;
  margin: 20px 50px;
  width: 500px;
`;
export const OptionWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  margin: 5px 0;
  flex-direction: row;
`;
export const PlotSelectedDetails = styled.span`
  min-width: 100px;
`;
export const PlotSelectedTitle = styled.span`
  min-width: 200px;
`;
export const CoinsImage = styled.img.attrs({
  src: Coins,
  resizeMode: 'contain',
})`
  margin-bottom: 30px;
  width: 80px;
`;
export const LoanDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const DetailsRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

export const Label = styled.strong`
  color: #a0a5c8;
  font-size: 16px;
`;

export const Value = styled.span`
  font-size: 18px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  width: 260px;
  height: 48px;
  margin: auto;
`;
export const CustomSelect = styled(Select)`
  width:220px;
  margin: 26px;
  border-radius: 10px;
  div {
    color: ${(props) => props.theme.colors.darkBlue};
  }
  .MuiSelect-select {
    padding-right: 13px !important;
    padding: 13px 18px;

    &:focus {
      background: transparent;
    }
  }

  .MuiOutlinedInput {
    border-color: ${(props) => props.theme.colors.darkBlue} !important;
  }
`;

export const FilterContainer = styled(FormControl)`
  label {
    color: ${(props) => props.theme.colors.darkBlue} !important;
  }
  svg {
    color: ${(props) => props.theme.colors.darkBlue};
  }`;
