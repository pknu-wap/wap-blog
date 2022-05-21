import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import CommentAPI from '../../../api/comment';

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

  const mutation = useMutation(
    'addComment',
    () => CommentAPI.create(articleId, { text: comment }),
    {
      onSuccess: async () => {
        setComment('');
        await queryClient.refetchQueries(['article', `${articleId}`]);
      },
    },
  );

  return (
    <Card onSubmit={handleSubmit}>
      <CardBlock>
        <textarea
          rows={3}
          placeholder="Write a comment..."
          onChange={onChange}
          value={comment}
        />
      </CardBlock>
      <CardFooter>
        <Button type="submit">Post Comment</Button>
      </CardFooter>
    </Card>
  );
};

const Card = styled('form')`
  margin-bottom: 0.75rem;
  background-color: #fff;
  border-radius: 0.25rem;
  border: 1px solid #e5e5e5;
`;

const CardBlock = styled('div')`
  textarea {
    width: 100%;
    font-size: 1rem;
    line-height: 1.25;
    background-color: #fff;
    border-radius: 0.25rem;
    border: 0;
    padding: 1.25rem;
    outline: none;
    color: black;
  }
`;

const CardFooter = styled('div')`
  text-align: center;
  border-top: 1px solid #e5e5e5;
  font-size: 0.8rem;
  font-weight: 300;
  padding: 0.75rem 1.25rem;
  background-color: #f5f5f5;
`;

const Button = styled('button')`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
`;

export default CommentInput;
