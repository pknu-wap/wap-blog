import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import S from './styled';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useRef, useState } from 'react';
import useWriteArticle from '../../hooks/query/article/useWriteArticle';
import blankImage from '/img/blank.svg';

interface IFormInputs {
  title: string;
  description: string;
  body: string;
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
  const [image, setImage] = useState<File>();
  const [PImage, setPImage] = useState<string>(blankImage);
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputEl.current?.click();
  };

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        setPImage(e.target.result);
      };
      setImage(file);
    } else {
      setImage(undefined);
      setPImage(blankImage);
    }
  };

  const handleAddTag = () => {
    const trimedTag = tag.trim();
    if (!!trimedTag) {
      const isExist = tagList.includes(trimedTag);
      if (!isExist) {
        const newTagList = tagList.concat(trimedTag);
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

  const onSubmit = async (input: IFormInputs) => {
    const formData = new FormData();
    formData.append('title', input.title);
    formData.append('description', input.description);
    formData.append('body', input.body);
    if (tagList.length > 0) {
      formData.append('tagList', JSON.stringify(tagList));
    }
    if (image) formData.append('file', image);

    mutation.mutate(formData);
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
        <fieldset>
          <S.WriteBody {...register('body')} rows={8} placeholder="내용" />
          <p>{errors.body?.message}</p>
        </fieldset>
        <fieldset>
          <S.WriteImage>
            <img src={PImage} onClick={onButtonClick} />
          </S.WriteImage>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={inputEl}
            style={{ display: 'none' }}
            onChange={changeImageHandler}
          />
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
