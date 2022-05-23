import styled from 'styled-components';
import tw from 'tailwind-styled-components';

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

export default {
  Card,
  CardBlock,
  CardFooter,
  CommentDeleteBtn,
};
