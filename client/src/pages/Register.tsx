import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

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

const Register = () => {
  const { register, watch, handleSubmit } = useForm();

  const onRegister = () => {};

  console.log(watch());
  return (
    <>
      {/* <Helmet>
        <title>회원가입</title>
      </Helmet> */}
      <RegisterForm onSubmit={handleSubmit(onRegister)}>
        <RegisterInput
          {...register('이메일')}
          type="email"
          placeholder="이메일"
        />
        <RegisterInput {...register('닉네임')} placeholder="닉네임" />
        <RegisterInput
          {...register('비밀번호')}
          type="password"
          placeholder="비밀번호"
        />
        <RegisterBtn>회원가입</RegisterBtn>
      </RegisterForm>
    </>
  );
};

export default Register;
