import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import ArticleAPI from '../api/article';

const WriteContainer = tw.div`
mt-[100px]
`;
const WriteForm = tw.form`
flex
flex-col
gap-1
`;

const WriteInput = styled.input`
  background-color: ${props => props.theme.lightTextColor};
`;
const WriteTitle = tw(WriteInput)``;
const WriteDescription = tw(WriteInput)``;
const WriteBody = tw(WriteInput)``;
const WriteTagList = tw(WriteTitle)``;
const WriteBtn = tw.button``;
interface IFormInputs {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}
const WritePage = () => {
  const { register, watch, handleSubmit } = useForm<IFormInputs>();
  const navigate = useNavigate();
  const onSubmit = async (input: IFormInputs) => {
    await ArticleAPI.create({ ...input, tagList: ['ss'] });
    navigate('/');
  };
  console.log(watch());
  return (
    <WriteContainer>
      <WriteForm onSubmit={handleSubmit(onSubmit)}>
        <WriteTitle {...register('title')} placeholder="제목 입력" />
        <WriteDescription
          {...register('description')}
          placeholder="설명 입력"
        />
        <WriteBody {...register('body')} placeholder="본문 입력" />
        <WriteTagList {...register('tagList')} placeholder="태그 입력" />
        <WriteBtn>업로드</WriteBtn>
      </WriteForm>
    </WriteContainer>
  );
};

export default WritePage;
