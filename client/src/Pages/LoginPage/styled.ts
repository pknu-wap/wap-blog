import styled from 'styled-components';
import tw from 'tailwind-styled-components';

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

const SocialLoginBtnContainer = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    height: 30px;
    width: 30px;
    :hover {
      cursor: pointer;
    }
    fill: ${(props) => props.theme.textColor};
  }
`;

export default {
  LoginForm,
  LoginInput,
  OAuthBlock,
  LoginBtn,
  SocialLoginBtnContainer,
};
