import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      auxPrimary: string;
      background: string;
      auxBackground: string;
      placeholder: string;
      textPrimary: string;
      darkBlue: string;
      darkBrown: string;
      lightGreen: string;
      lightGray: string;
    };
  }
}
