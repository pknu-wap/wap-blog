import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const TagListContainerColor = styled.div`
  border-color: ${props => props.theme.borderColor};
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
  color: ${props => props.theme.textColor};
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
`;

const TagItemName = tw.span``;

const TagItemCount = tw.span``;

const TagList = () => {
  const testTag = ['cool', 'good', 'bye', 'hi', 'hello'];
  return (
    <>
      <TagListContainer>
        <TagListTitle>태그 목록 (5)</TagListTitle>
        <TagItemList>
          {testTag.map(tag => (
            <TagItemContainer key={+tag}>
              <TagItemName>{tag}</TagItemName>
              <TagItemCount>(1)</TagItemCount>
            </TagItemContainer>
          ))}
        </TagItemList>
      </TagListContainer>
    </>
  );
};
export default TagList;
