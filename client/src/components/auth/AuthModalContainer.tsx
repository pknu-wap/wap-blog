import AuthForm from './AuthForm';
import AuthModal from './AuthModal';

interface AuthModalContainerProps {
  visible: boolean;
}

const AuthModalContainer = ({ visible }: AuthModalContainerProps) => {
  const onClose = () => {};
  return (
    <AuthModal visible={visible} onClose={onClose}>
      <AuthForm />
    </AuthModal>
  );
};

export default AuthModalContainer;
