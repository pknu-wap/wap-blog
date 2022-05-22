import { useStore } from '../../../store/store';
import AuthForm from '../AuthForm';
import AuthModal from '../AuthModal';

interface AuthModalContainerProps {
  visible: boolean;
}

const AuthModalContainer = ({ visible }: AuthModalContainerProps) => {
  const { closeAuthModal } = useStore();
  return (
    <AuthModal visible={visible} onClose={closeAuthModal}>
      <AuthForm />
    </AuthModal>
  );
};

export default AuthModalContainer;
