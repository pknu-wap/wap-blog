import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const WriteContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  fieldset {
    margin-bottom: 1rem;
  }
  margin-top: 8rem;
`;
const WriteTagList = styled.input`
  color: black;
`;
const WriteForm = styled.form`
  input,
  textarea {
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    background-color: #fff;
    width: 100%;
    padding: 0.5rem 0.75rem;
    line-height: 1.25;
  }
`;

const WriteInput = styled.input`
  background-color: ${(props) => props.theme.lightTextColor};
  color: black;
`;
const WriteTitle = tw(WriteInput)``;
const WriteDescription = tw(WriteInput)``;
const WriteBody = styled.textarea`
  color: black;
`;

const WriteImageColor = styled.label`
  background-color: #fff;
  color: ${(props) => props.theme.lightTextColor};
  :hover {
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
`;

const WriteImage = tw(WriteImageColor)`
flex 
h-full
w-full
cursor-pointer 
items-center 
justify-center 
rounded-md 
border-2 
border-dashed 
border-gray-300 
mb-4
p-10
`;

const WriteBtn = styled.button`
  border-radius: 0.25rem;
  border: 1px solid black;
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem;
  margin-top: 2rem;
`;
const TagList = styled('div')`
  display: flex;
  span {
    display: flex;
    margin: 1rem;
    button {
      margin-right: 0.5rem;
    }
  }
`;

export default {
  WriteContainer,
  WriteTagList,
  WriteForm,
  WriteInput,
  WriteTitle,
  WriteDescription,
  WriteBody,
  WriteImageColor,
  WriteImage,
  WriteBtn,
  TagList,
};
