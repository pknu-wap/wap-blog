import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import S from './styled';
import TagAPI from '../../api/tag';

interface TagListProps {
  username: string;
}

const TagList = ({ username }: TagListProps) => {
  const { data } = useQuery(['tags', username], () =>
    TagAPI.getUserTags(username),
  );
  return (
    <>
      <S.TagListContainer>
        <S.TagListTitle>태그 목록</S.TagListTitle>
        <S.TagItemList>
          <S.TagItemContainer>
            <div>
              <Link to={`/@${username}`}>
                <S.TagItemName>전체보기</S.TagItemName>
                <S.TagItemCount>({data?.allCount})</S.TagItemCount>
              </Link>
            </div>
            {data?.tagList.map((tag) => (
              <div key={tag.id}>
                <Link to={`/@${username}?tag=${tag.name}`}>
                  <S.TagItemName>{tag.name}</S.TagItemName>
                  <S.TagItemCount>({tag.articles_count})</S.TagItemCount>
                </Link>
              </div>
            ))}
          </S.TagItemContainer>
        </S.TagItemList>
      </S.TagListContainer>
    </>
  );
};
export default TagList;
