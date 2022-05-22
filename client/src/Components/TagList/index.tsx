import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import TagAPI from '../../api/tag';

const TagListContainerColor = styled.div`
  border-color: ${(props) => props.theme.borderColor};
`;

const TagListContainer = tw(TagListContainerColor)`
fixed
w-[15%]
h-full
ml-10
px-1
py-1
box-content
flex
justify-center
`;

const TagListTitleColor = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
const TagListTitle = tw(TagListTitleColor)`
border-b
border-solid
h-[5%]
w-full
`;

const TagItemList = tw.ul`

absolute
w-full
top-10
`;

const TagItemContainer = tw.li`
py-2
px-1
flex
flex-col
gap-2
`;

const TagItemName = tw.span``;

const TagItemCount = tw.span``;

interface TagListProps {
  username: string;
}

const TagList = ({ username }: TagListProps) => {
  const { data } = useQuery(['tags', username], () =>
    TagAPI.getUserTags(username),
  );
  return (
    <>
      <TagListContainer>
        <TagListTitle>태그 목록</TagListTitle>
        <TagItemList>
          <TagItemContainer>
            <div>
              <Link to={`/@${username}`}>
                <TagItemName>전체보기</TagItemName>
                <TagItemCount>({data?.allCount})</TagItemCount>
              </Link>
            </div>
            {data?.tagList.map((tag) => (
              <div key={tag.id}>
                <Link to={`/@${username}?tag=${tag.name}`}>
                  <TagItemName>{tag.name}</TagItemName>
                  <TagItemCount>({tag.articles_count})</TagItemCount>
                </Link>
              </div>
            ))}
          </TagItemContainer>
        </TagItemList>
      </TagListContainer>
    </>
  );
};
export default TagList;
