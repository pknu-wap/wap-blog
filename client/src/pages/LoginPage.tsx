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
import { ISigninRequest } from '../interfaces/auth.interface';

const LoginForm = tw.form`
border-2
max-w-[1024px]
border-solid
mx-auto
flex
flex-col
mt-[200px]
`;

const LoginInput = tw.input`
border
border-solid
`;

const OAuthBlock = tw.div`
max-w-[1024px]  
mx-auto
mt-2
`;

const LoginBtn = styled.button``;

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
  } = useForm<ISigninRequest>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const mutation = useMutation(
    'signin',
    async (body: ISigninRequest) => {
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

  const onSubmit = async (data: ISigninRequest) => {
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
      <OAuthBlock>
        <div>
          <button onClick={handleGithubLogin}>깃허브</button>
        </div>
        <div>
          <button onClick={handleGoogleLogin}>구글</button>
        </div>
      </OAuthBlock>
    </>
  );
};

export default LoginPage;
