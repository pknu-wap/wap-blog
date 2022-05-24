import axios from 'axios';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import CommentAPI from '../../../api/comment';
import { QUERY_KEYS } from '../../../config/queryKeys';
import { IComment } from '../../../interfaces/comment.interface';
import client from '../../../utils/axios';
import S from './styled';

interface IUpdate {
  setIsUpdate: (isUpdate: boolean) => void;
  comment: IComment;
  articleId: number;
}

const UpdateComment = ({ setIsUpdate, comment, articleId }: IUpdate) => {
  const [updatedComment, setUpdatedComment] = useState('');
  const queryClient = useQueryClient();
  const onCancel = () => {
    setIsUpdate(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedComment(event.currentTarget.value);
  };

  const onUpdate = async () => {
    if (!updatedComment) return;
    await CommentAPI.update(comment.id, updatedComment);
    await queryClient.refetchQueries([QUERY_KEYS.ARTICLE, articleId]);

    setIsUpdate(false);
  };

  return (
    <>
      <S.CardBlock as="input" placeholder={comment.text} onChange={onChange} />
      <S.CardFooter style={{ color: 'black' }}>
        <button onClick={onCancel}>취소</button>
        <button onClick={onUpdate}>수정</button>
      </S.CardFooter>
    </>
  );
};
export default UpdateComment;
