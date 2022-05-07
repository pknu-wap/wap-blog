import { Suspense } from 'react';
import ArticleDetail from '../components/article/ArticleDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ArticlePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ArticleDetail />
      </Suspense>
    </>
  );
};

export default ArticlePage;
