import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import AuthAPI from '../api/auth';

const RegisterForm = tw.form`
border-2
border-solid
mx-auto
flex
flex-col
`;

const RegisterInput = tw.input`
border
border-solid
`;

const RegisterBtn = styled.button``;

interface IFormInputs {
  email: string;
  username: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInputs>();

  const onRegister = async (input: IFormInputs) => {
    await AuthAPI.signup(input);
    navigate('/login');
  };

  return (
    <>
      <RegisterForm onSubmit={handleSubmit(onRegister)}>
        <RegisterInput
          {...register('email')}
          type="email"
          placeholder="이메일"
        />
        <RegisterInput {...register('username')} placeholder="닉네임" />
        <RegisterInput
          {...register('password')}
          type="password"
          placeholder="비밀번호"
        />
        <RegisterBtn>회원가입</RegisterBtn>
      </RegisterForm>
    </>
  );
};

export default RegisterPage;
