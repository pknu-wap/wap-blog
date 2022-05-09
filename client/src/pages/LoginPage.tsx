import { properties } from '../config/properties';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import AuthAPI from '../api/auth';
import { useStore } from '../store/store';
import { useMutation } from 'react-query';
import { useState } from 'react';

const LoginForm = tw.form`
border-2
border-solid
mx-auto
flex
flex-col
mt-20
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

const schema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식이어야합니다')
    .required('필수항목입니다'),
  password: yup.string().required('필수 항목입니다'),
});

const LoginPage = () => {
  const { setUser } = useStore();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const mutation = useMutation(
    'signin',
    async (body: IFormInputs) => {
      const user = await AuthAPI.signin(body);
      return user;
    },
    {
      onSuccess: async data => {
        setUser(data);
        navigate('/');
      },
      onError: async (e: any) => {
        setServerError(e.response.data.message);
      },
    },
  );

  const onSubmit = async (data: IFormInputs) => {
    mutation.mutate(data);
  };

  const handleGithubLogin = async () => {
    window.location.href = properties.BASE_URL + '/auth/signin/github';
  };
  const handleGoogleLogin = async () => {
    window.location.href = properties.BASE_URL + '/auth/signin/google';
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput {...register('email')} type="email" placeholder="이메일" />
        <p>{errors.email?.message}</p>
        <LoginInput
          {...register('password')}
          type="password"
          placeholder="비밀번호"
        />
        <p>{errors.password?.message}</p>
        <p>{serverError}</p>
        <LoginBtn>로그인</LoginBtn>
      </LoginForm>
      <div>
        <button onClick={handleGithubLogin}>깃허브</button>
      </div>
      <div>
        <button onClick={handleGoogleLogin}>구글</button>
      </div>
    </>
  );
};

export default LoginPage;
