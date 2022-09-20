import styled from 'styled-components';

export const InfoContainer = styled.div`
width: 370px;
font-size: 0.8rem;
font-weight: 400;
line-height: 21px;
`;
export const InfoWrapper = styled.div`
flex-direction: row;
display: flex;
align-items: baseline;
`;

export const InfoText = styled.p`
font-weight: ${(props) => (props.color ? '600' : '400')};
`;
