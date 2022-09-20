import styled from 'styled-components';

export const modalStyles = (height: string, width: string) => ({
  content: {
    width,
    height,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 1px 4px lightgray',
    border: 'none',
  },
  overlay: {
    background: 'rgb(36 36 36 / 60%)',
  },
});

export const CloseButton = styled.div`
  position: absolute;
  right: 20px;

  &:hover {
    cursor: pointer;
  }
`;
