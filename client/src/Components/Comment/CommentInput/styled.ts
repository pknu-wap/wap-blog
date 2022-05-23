import styled from 'styled-components';

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

export default {
  Card,
  CardBlock,
  CardFooter,
  Button,
};
