import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const ArticleContainer = tw.div`
w-full 
mt-[100px]
`;

const Articles = tw.ul`
w-1/2
mx-auto
divide-y-2
divide-solid
`;
const Article = styled.li`
  padding: 20px 0;
`;

const ArticleTitleColor = styled.h2`
  color: ${(props) => props.theme.textColor};
`;
const ArticleTitle = tw(ArticleTitleColor)`
text-xl
font-medium
`;
const ArticleDescriptonColor = styled.span`
  color: ${(props) => props.theme.lightTextColor};
`;
const ArticleDescripton = tw(ArticleDescriptonColor)`
text-lg
font-light
`;

export default {
  ArticleContainer,
  Articles,
  Article,
  ArticleTitleColor,
  ArticleTitle,
  ArticleDescriptonColor,
  ArticleDescripton,
};
