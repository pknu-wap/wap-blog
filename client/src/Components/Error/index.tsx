import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const ErrorMessageColor = styled.span`
  color: ${(props) => props.theme.errorMessageColor};
`;
const ErrorMessage = tw(ErrorMessageColor)``;

const Error = () => {
  return (
    <>
      <ErrorMessage>에러</ErrorMessage>
    </>
  );
};

export default Error;
