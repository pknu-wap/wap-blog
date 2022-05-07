import { useStore } from '../store/store';
import GlobalStyle from '../styles/GlobalStyle';
import AuthModalContainer from './auth/AuthModalContainer';
import AuthProvider from './auth/AuthProvider';

const Core = () => {
  const { authModal } = useStore();
  AuthProvider();

  return (
    <>
      <GlobalStyle />
      <AuthModalContainer visible={authModal.visible} />
    </>
  );
};

export default Core;
