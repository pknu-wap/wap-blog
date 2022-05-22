import { Suspense } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ArticleList2 from '../../Components/Article/ArticleList2';
import LoadingSpinner from '../../Components/Common/LoadingSpinner';
import TagList from '../../Components/TagList';

const BlogPage = () => {
  const { username } = useParams();
  const [search] = useSearchParams();
  const tag = search.get('tag');

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <TagList username={username!} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ArticleList2 username={username!} tag={tag!} />
      </Suspense>
    </>
  );
};

export default BlogPage;
