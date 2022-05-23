import S from './styled';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AuthModal = ({ visible, onClose }: AuthModalProps) => {
  return (
    <S.AuthModalWrapper visible={visible}>
      <div>AuthModal</div>
      <button onClick={onClose}>버튼</button>
    </S.AuthModalWrapper>
  );
};

export default AuthModal;
