import GlobalStyle from '../styles/GlobalStyle';
import AuthProvider from './auth/AuthProvider';

const Core = () => {
  AuthProvider();
  return (
    <>
      <GlobalStyle />
    </>
  );
};

export default Core;
