import styled from 'styled-components';
import tw from 'tailwind-styled-components';

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

export default {
  RegisterForm,
  RegisterInput,
  RegisterBtn,
};
