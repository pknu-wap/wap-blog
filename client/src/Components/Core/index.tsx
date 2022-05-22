import GlobalStyle from '../../styles/GlobalStyle';
import AuthModalContainer from '../Auth/AuthModalContainer';
import AuthProvider from '../Auth/AuthProvider';
import { useStore } from '../../store/store';

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
