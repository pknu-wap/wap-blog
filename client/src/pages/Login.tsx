import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import AuthAPI from '../api/auth';

const LoginForm = tw.form`
border-2
border-solid
mx-auto
flex
flex-col
`;

const LoginInput = tw.input`
border
border-solid
`;

const LoginBtn = styled.button``;

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, watch, handleSubmit } = useForm<IFormInputs>();
  const onLogin = async (input: IFormInputs) => {
    await AuthAPI.signin(input);
  };

  console.log(watch());
  return (
    <>
      {/* <Helmet>
        <title>로그인</title>
      </Helmet> */}
      <LoginForm onSubmit={handleSubmit(onLogin)}>
        <LoginInput {...register('email')} type="email" placeholder="이메일" />
        <LoginInput
          {...register('password')}
          type="password"
          placeholder="비밀번호"
        />
        <LoginBtn>로그인</LoginBtn>
      </LoginForm>
    </>
  );
};

export default Login;
