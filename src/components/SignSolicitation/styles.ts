import styled from 'styled-components';
import { Form } from '@unform/web';
import Coins from '../../assets/images/coins.png';

export const Container = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const modalStyles = {
  content: {
    width: '600px',
    height: '300px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 1px 4px lightgray',
    border: 'none',
    overflow: 'unset !important',
  },
  overlay: {
    background: 'rgb(36 36 36 / 60%)',
  },
};

export const CoinsImage = styled.img.attrs({
  src: Coins,
  resizeMode: 'contain',
})`
  width: 80px;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin: 20px 0;
  font-weight: 600;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  height: 48px;
`;

export const FormBox = styled(Form)`
  position: relative;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
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
