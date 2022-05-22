import styled from 'styled-components';
import { IComment } from '../../../interfaces/comment.interface';
import ArticleWriterAndUpdatedAt from '../../Article/ArticleWriterAndUpdateAt';
import tw from 'tailwind-styled-components';
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
    <Card>
      <CardBlock>{comment.text}</CardBlock>
      <CardFooter>
        <ArticleWriterAndUpdatedAt
          user={comment.user}
          updatedAt={comment.updatedAt + ''}
        />
        {comment.user.id === user?.id && (
          <CommentDeleteBtn onClick={onCommentDelete}>❌</CommentDeleteBtn>
        )}
      </CardFooter>
    </Card>
  );
};

const Card = styled('div')`
  margin-bottom: 0.75rem;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid #e5e5e5;
`;

const CardBlock = styled('div')`
  width: 100%;
  font-size: 1rem;
  line-height: 1.25;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 0;
  padding: 1.25rem;
  outline: none;
  color: black;
`;

const CardFooter = styled('div')`
  border-top: 1px solid #e5e5e5;
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0.75rem 1.25rem;
  background-color: #f5f5f5;
`;

const CommentDeleteBtn = tw.span`
hover:cursor-pointer
`;

export default CommentItem;
