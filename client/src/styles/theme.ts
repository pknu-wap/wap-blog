import { DefaultTheme } from 'styled-components';

export const lightMode: DefaultTheme = {
  textColor: 'black',
  accentColor: 'red',
  lightTextColor: 'gray',
  bgColor: 'white',
  navBgColor: '#F8F9FA',
  bannerColor: '#FFEF82',
  borderColor: 'black',
  errorMessageColor: 'red',
};
//darkMode 예정
export const darkMode: DefaultTheme = {
  textColor: 'white',
  accentColor: 'blue',
  lightTextColor: 'gray',
  bgColor: '#2f3640',
  navBgColor: '#FFEF82',
  bannerColor: '#d8f5a2',
  borderColor: 'ghostwhite',
  errorMessageColor: 'red',
};
