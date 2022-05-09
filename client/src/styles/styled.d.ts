import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    accentColor: string;
    lightTextColor: string;
    bgColor: string;
    navBgColor: string;
    bannerColor: string;
    borderColor: string;
    errorMessageColor: string;
  }
}
