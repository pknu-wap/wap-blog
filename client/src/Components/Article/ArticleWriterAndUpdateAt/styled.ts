import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const ArticleWriterAndUpdatedAtContainer = tw.div`
flex
flex-col
`;
const ArticleWriterColor = styled.span`
  color: ${(props) => props.theme.textColor};
`;
const ArticleWriter = tw(ArticleWriterColor)`
text-base
font-semibold
`;
const ArticleUpdatedAtColor = styled.span`
  color: ${(props) => props.theme.lightTextColor};
`;
const ArticleUpdatedAt = tw(ArticleUpdatedAtColor)`
text-xs
`;

export default {
  ArticleWriterAndUpdatedAtContainer,
  ArticleWriterColor,
  ArticleWriter,
  ArticleUpdatedAtColor,
  ArticleUpdatedAt,
};
