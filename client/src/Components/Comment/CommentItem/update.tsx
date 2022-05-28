import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../config/queryKeys';
import useUpdateComment from '../../../hooks/query/comment/useUpdateComment';
import { IComment } from '../../../interfaces/comment.interface';
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
    mutation.mutate();
    setIsUpdate(false);
  };
  const mutation = useUpdateComment(comment.id, updatedComment, {
    onSuccess: async () => {
      await queryClient.refetchQueries([QUERY_KEYS.ARTICLE, articleId]);
    },
  });

  return (
    <form
      onSubmit={async (event: React.FormEvent) => {
        event.preventDefault();
        await onUpdate();
      }}
    >
      <S.Card>
        <S.CardBlock
          as="input"
          placeholder={comment.text}
          onChange={onChange}
        />
        <S.CardFooter style={{ color: 'black' }} className="flex gap-1 ">
          <button type="button" onClick={onCancel}>
            취소
          </button>
          <button type="button" onClick={onUpdate}>
            수정
          </button>
        </S.CardFooter>
      </S.Card>
    </form>
  );
};
export default UpdateComment;
