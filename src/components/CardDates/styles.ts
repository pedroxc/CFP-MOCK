import styled from 'styled-components';

interface IDates {
  refusedColor?: boolean;
  dynamicColors?: boolean;
  admissionColor?: boolean;
}

export const DatesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

export const DatesContainer = styled.div<IDates>`
  ${(props) => {
    if (props.dynamicColors) {
      if (props.refusedColor) {
        return `
        background: mistyrose;
        color: brown;
      `;
      }
      if (props.admissionColor) {
        return `
        background: aliceblue;
        color: ${props.theme.colors.darkBlue};
      `;
      }
      return `
        background: mintcream;
        color: darkseagreen;
      `;
    }
    return `
      background: ${props.theme.colors.background};
      color: ${props.theme.colors.darkBlue};
    `;
  }};
  border-radius: 7px;
  height: 26px;
  min-width: 109px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 5px;

  svg {
    margin-right: 5px;
  }
`;
