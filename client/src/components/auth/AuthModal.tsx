interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AuthModal = ({ visible, onClose }: AuthModalProps) => {
  return <div>AuthModal</div>;
};

export default AuthModal;
