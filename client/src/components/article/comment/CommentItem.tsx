import styled from 'styled-components';
import { IComment } from '../../../interfaces/comment.interface';

interface CommentItemProps {
  comment: IComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Card>
      <CardBlock>{comment.text}</CardBlock>
      <CardFooter>{comment.user.username}</CardFooter>
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
`;

const CardFooter = styled('div')`
  border-top: 1px solid #e5e5e5;
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0.75rem 1.25rem;
  background-color: #f5f5f5;
`;

export default CommentItem;
