import React from 'react';

interface ModalWrapperProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  return (
    <div onClick={onClose}>
      <div>Modal</div>
      <button onClick={onClose}>닫기</button>
      <div>{children}</div>
    </div>
  );
};

export default ModalWrapper;
