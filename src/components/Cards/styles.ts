import styled from 'styled-components';

interface IActionBtns {
  backgroundColor?: string;
}

interface IStatus {
  flagColor?: string;
  color?: string;
}

export const Container = styled.div`
  position: relative;
  width: 95%;
  min-width: 1000px;
  height: 151px;
  box-shadow: 0px 1px 4px ${(props) => props.theme.colors.lightGray};
  border-radius: 20px;
  display: flex;
  margin: 20px 2px;
  background: white;
`;

export const InfoColumn = styled.div`
  display: grid;
  padding-top: 10px;
  padding-left: 25px;
`;

export const StatusWarpper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 40px;
  height: 100%;
`;

export const DischargeStatus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 400;
  padding-bottom: 5px;

  svg {
    margin-right: 3px;
  }
`;

export const StatusSecondLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin: 15px 0;
`;

export const Status = styled.div<IStatus>`
  border: 1px solid ${(props) => (props.flagColor ? props.theme.colors.lightGray : props.theme.colors.darkBlue)};
  background-color: ${(props) => (props.flagColor ? 'white' : props.theme.colors.darkBlue)};
  color: ${(props) => (props.color ? props.color : 'black')};
  border-radius: 5px 20px 20px 5px;
  border-left: 3.5px solid ${(props) => props.flagColor || props.theme.colors.darkBlue};
  font-weight: ${(props) => (props.color ? '300' : '600')};
  font-size: 0.8rem;
  height: 27px;
  min-width: 114px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 14px;
`;

export const TreeDots = styled.button`
  margin-left:14px
`;

export const ActionButtons = styled.button<IActionBtns>`
  color : ${(props) => (props.backgroundColor ? 'white' : props.theme.colors.auxPrimary)};
  margin-left: 15px;
  width: 25px;
  height: 25px;

  svg {
    box-shadow: 0px 1px 4px ${(props) => props.theme.colors.lightGray};
    background: ${(props) => props.backgroundColor || 'white'};
    border-radius: 3px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;
