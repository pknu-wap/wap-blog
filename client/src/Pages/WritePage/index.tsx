import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import S from './styled';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useState } from 'react';
import useWriteArticle from '../../hooks/query/article/useWriteArticle';

interface IFormInputs {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

const schema = yup.object().shape({
  title: yup.string().required('필수항목입니다'),
  description: yup.string().required('필수 항목입니다.'),
  body: yup.string().required('필수 항목입니다'),
});

const WritePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [tagList, setTagList] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');
  const changeTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  const handleAddTag = () => {
    if (!!tag) {
      const isExist = tagList.includes(tag.trim());
      if (!isExist) {
        const newTagList = tagList.concat(tag);
        setTagList(newTagList);
      }
      setTag('');
    }
  };
  const handleRemoveTag = (extag: string) => {
    const newTagList = tagList.filter((tag) => tag !== extag);
    setTagList(newTagList);
  };
  const handleTagInputKeyDown = (e: any) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      if (e.key !== 'Tab') {
        e.preventDefault();
      }
      handleAddTag();
    }
  };
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const mutation = useWriteArticle({
    onSuccess: async () => {
      navigate('/');
    },
    onError: (e: any) => {
      setServerError(e.response.data.message);
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate({ tagList, ...data });
  };

  return (
    <S.WriteContainer>
      <S.WriteForm onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <S.WriteTitle {...register('title')} type="text" placeholder="제목" />
          <p>{errors.title?.message}</p>
        </fieldset>
        <fieldset>
          <S.WriteDescription
            {...register('description')}
            type="text"
            placeholder="설명"
          />
          <p>{errors.description?.message}</p>
        </fieldset>
        <S.WriteImage>
          <svg
            className="h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
          />
        </S.WriteImage>
        <fieldset>
          <S.WriteBody {...register('body')} rows={8} placeholder="내용" />
          <p>{errors.body?.message}</p>
        </fieldset>
        <fieldset>
          <S.WriteTagList
            type="text"
            placeholder="Enter tags"
            value={tag}
            onChange={changeTagInput}
            onBlur={handleAddTag}
            onKeyDown={handleTagInputKeyDown}
          />
          <S.TagList>
            {tagList.map((tag, index) => (
              <span key={index}>
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  X
                </button>
                {tag}
              </span>
            ))}
          </S.TagList>
        </fieldset>
        <fieldset>
          <p>{serverError}</p>
        </fieldset>
        <S.WriteBtn>글쓰기</S.WriteBtn>
      </S.WriteForm>
    </S.WriteContainer>
  );
};

export default WritePage;
