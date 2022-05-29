import styled from 'styled-components';

const SocialContainer = styled.div`
  display: flex;
  svg {
    margin-right: 10px;
    :hover {
      cursor: pointer;
    }
  }
`;
const BtnContainer = styled.div`
  button {
    color: ${(props) => props.theme.textColor};
  }
`;
export default {
  SocialContainer,
  BtnContainer,
};
