import S from './styled';
import { IComment } from '../../../interfaces/comment.interface';
import ArticleWriterAndUpdatedAt from '../../Article/ArticleWriterAndUpdateAt';
import { useStore } from '../../../store/store';
import { useQueryClient } from 'react-query';
import useDeleteComment from '../../../hooks/query/comment/useDeleteComment';
import { QUERY_KEYS } from '../../../config/queryKeys';

interface CommentItemProps {
  comment: IComment;
  articleId: number;
  setIsUpdate: (isUpdate: boolean) => void;
  setClickedComment: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const CommentItem = ({
  comment,
  articleId,
  setIsUpdate,
  setClickedComment,
}: CommentItemProps) => {
  const { user } = useStore();
  const queryClient = useQueryClient();

  const deleteComment = () => {
    mutation.mutate();
  };
  const updateComment = () => {
    setIsUpdate(true);
    setClickedComment(comment.id);
  };

  const mutation = useDeleteComment(comment.id, {
    onSuccess: async () => {
      await queryClient.refetchQueries([QUERY_KEYS.ARTICLE, articleId]);
    },
  });

  return (
    <S.Card>
      <S.CardBlock>{comment.text}</S.CardBlock>
      <S.CardFooter>
        <ArticleWriterAndUpdatedAt
          user={comment.user}
          updatedAt={comment.updatedAt + ''}
        />
        {comment.user.id === user?.id && (
          <div className="flex gap-1 mt-2">
            <S.CommentDeleteBtn onClick={deleteComment}>
              삭제
            </S.CommentDeleteBtn>
            <S.CommentUpdateBtn onClick={updateComment}>
              수정
            </S.CommentUpdateBtn>
          </div>
        )}
      </S.CardFooter>
    </S.Card>
  );
};

export default CommentItem;
