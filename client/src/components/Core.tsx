import GlobalStyle from '../styles/GlobalStyle';
import AuthModalContainer from './auth/AuthModalContainer';
import AuthProvider from './auth/AuthProvider';

const Core = () => {
  AuthProvider();
  return (
    <>
      {
        <GlobalStyle />

        /* <AuthModalContainer /> */
      }
    </>
  );
};

export default Core;
