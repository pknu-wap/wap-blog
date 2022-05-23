import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const ArticleContainer = tw.div`
w-full
flex
flex-col
`;
const ArticleHeaderColor = styled.div`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bannerColor};
`;
const ArticleHeader = tw(ArticleHeaderColor)`
flex
flex-col
border
border-solid
px-[15%]
pb-5
mt-16
`;

const ArticleHeaderColumn = tw.div`
flex
justify-between
w-full
`;

const ArticleTitle = tw.h1`
mt-20
text-4xl
font-bold
mx-auto
`;

const ArticleTags = tw.ul`
mt-2
flex
gap-2
`;
const ArticleTag = tw.li`
border
border-solid
px-2
py-1
rounded-md
`;
const ArticleBodyContainer = tw.div`
w-[80%]
mx-auto
mt-2
`;
const ArticleBody = tw.p`
mt-3
`;

const ArticleDeleteBtn = tw.button``;

export default {
  ArticleContainer,
  ArticleHeaderColor,
  ArticleHeader,
  ArticleHeaderColumn,
  ArticleTitle,
  ArticleTags,
  ArticleTag,
  ArticleBodyContainer,
  ArticleBody,
  ArticleDeleteBtn,
};
