import { properties } from '../config/properties';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import AuthAPI from '../api/auth';
import { useStore } from '../store/store';

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

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInputs>();
  const { setUser } = useStore();
  const onLogin = async (input: IFormInputs) => {
    const user = await AuthAPI.signin(input);
    setUser(user);
    navigate('/');
  };

  const handleGithubLogin = async () => {
    window.location.href = properties.BASE_URL + '/auth/signin/github';
  };
  const handleGoogleLogin = async () => {
    window.location.href = properties.BASE_URL + '/auth/signin/google';
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit(onLogin)}>
        <LoginInput {...register('email')} type="email" placeholder="이메일" />
        <LoginInput
          {...register('password')}
          type="password"
          placeholder="비밀번호"
        />
        <LoginBtn>로그인</LoginBtn>
        <div>
          <button onClick={handleGithubLogin}>깃허브</button>
        </div>
        <div>
          <button onClick={handleGoogleLogin}>구글</button>
        </div>
      </LoginForm>
    </>
  );
};

export default LoginPage;
