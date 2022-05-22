import S from './styled';
import { IComment } from '../../../interfaces/comment.interface';
import ArticleWriterAndUpdatedAt from '../../Article/ArticleWriterAndUpdateAt';
import CommentAPI from '../../../api/comment';
import { useStore } from '../../../store/store';
import { useMutation, useQueryClient } from 'react-query';

interface CommentItemProps {
  comment: IComment;
  articleId: number;
}

const CommentItem = ({ comment, articleId }: CommentItemProps) => {
  const { user } = useStore();
  const queryClient = useQueryClient();

  const onCommentDelete = () => {
    mutation.mutate();
  };
  const mutation = useMutation(
    'deleteComment',
    () => CommentAPI.delete(comment.id),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(['article', `${articleId}`]);
      },
    },
  );

  return (
    <S.Card>
      <S.CardBlock>{comment.text}</S.CardBlock>
      <S.CardFooter>
        <ArticleWriterAndUpdatedAt
          user={comment.user}
          updatedAt={comment.updatedAt + ''}
        />
        {comment.user.id === user?.id && (
          <S.CommentDeleteBtn onClick={onCommentDelete}>❌</S.CommentDeleteBtn>
        )}
      </S.CardFooter>
    </S.Card>
  );
};

export default CommentItem;
