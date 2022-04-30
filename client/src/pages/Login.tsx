import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { Helmet } from 'react-helmet';

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

const Login = () => {
  const { register, watch, handleSubmit } = useForm();

  const onLogin = () => {};

  console.log(watch());
  return (
    <>
      {/* <Helmet>
        <title>로그인</title>
      </Helmet> */}
      <LoginForm onSubmit={handleSubmit(onLogin)}>
        <LoginInput {...register('이메일')} type="email" placeholder="이메일" />
        <LoginInput {...register('닉네임')} placeholder="닉네임" />
        <LoginInput
          {...register('비밀번호')}
          type="password"
          placeholder="비밀번호"
        />
        <LoginBtn>로그인</LoginBtn>
      </LoginForm>
    </>
  );
};

export default Login;
