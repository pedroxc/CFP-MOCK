import styled from 'styled-components';

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

export const CloseButton = styled.div`
  position: absolute;
  right: 20px;

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-top: 60px;
  font-weight: 600;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  height: 48px;
  position: absolute;
  bottom: 35px;
`;
