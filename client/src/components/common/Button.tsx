import { MouseEventHandler } from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  onClick,
  type = 'button',
  children,
  size = 'medium',
}: ButtonProps) => {
  return <Container {...{ onClick, type, size }}>{children}</Container>;
};

const Container = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
`;

export default Button;
