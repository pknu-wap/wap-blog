import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import AuthAPI from '../../api/auth';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { ISignupRequest } from '../../interfaces/auth.interface';

const RegisterForm = tw.form`
border-2
max-w-[1024px]
border-solid
mx-auto
flex
flex-col
mt-[200px]
`;

const RegisterInput = tw.input`
border
border-solid
`;

const RegisterBtn = styled.button``;

const schema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식이어야합니다')
    .required('필수항목입니다'),
  username: yup.string().required('필수 항목입니다'),
  password: yup.string().required('필수 항목입니다'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupRequest>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const mutation = useMutation(
    'signup',
    async (body: ISignupRequest) => {
      await AuthAPI.signup(body);
    },
    {
      onSuccess: async () => {
        navigate('/');
      },
      onError: (e: any) => {
        setServerError(e.response.data.message);
      },
    },
  );

  const onSubmit = async (data: ISignupRequest) => {
    mutation.mutate(data);
  };

  return (
    <>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <RegisterInput
          {...register('email')}
          type="email"
          placeholder="이메일"
        />
        <p>{errors.email?.message}</p>
        <RegisterInput {...register('username')} placeholder="닉네임" />
        <p>{errors.username?.message}</p>
        <RegisterInput
          {...register('password')}
          type="password"
          placeholder="비밀번호"
        />
        <p>{errors.password?.message}</p>

        <RegisterBtn>회원가입</RegisterBtn>
        <p>{serverError}</p>
      </RegisterForm>
    </>
  );
};

export default RegisterPage;
