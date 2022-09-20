import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  height: calc(100vh - 73px);
  position: relative;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
  text-align: left;
`;

export const ImportContainer = styled.div`
background: ${(props) => props.theme.colors.auxBackground};
border: 1px solid;
border-radius: 16px;
width: 100%;
height: 400px;
padding: 16px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 16px;

svg{
  border: 3px solid;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.darkBlue};
  color:white;
  margin-top: 10px;

}

&.dragingContainer{
  background: ${(props) => props.theme.colors.lightGray};
  border: 2px dashed ${(props) => props.theme.colors.darkBrown};

}
`;
