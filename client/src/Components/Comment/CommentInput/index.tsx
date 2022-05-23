import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../config/queryKeys';
import useWriteComment from '../../../hooks/query/comment/useWriteComment';
import S from './styled';

interface CommentInputProps {
  articleId: number;
}

const CommentInput = ({ articleId }: CommentInputProps) => {
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (comment === '') return;
    mutation.mutate();
  };

  const mutation = useWriteComment(
    articleId,
    { text: comment },
    {
      onSuccess: async () => {
        setComment('');
        await queryClient.refetchQueries([QUERY_KEYS.ARTICLE, articleId]);
      },
    },
  );

  return (
    <S.Card onSubmit={handleSubmit}>
      <S.CardBlock>
        <textarea
          rows={3}
          placeholder="Write a comment..."
          onChange={onChange}
          value={comment}
        />
      </S.CardBlock>
      <S.CardFooter>
        <S.Button type="submit">Post Comment</S.Button>
      </S.CardFooter>
    </S.Card>
  );
};

export default CommentInput;
