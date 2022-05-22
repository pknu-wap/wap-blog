import { Suspense } from 'react';
import ArticleDetail from '../../Components/Article/ArticleDetail';
import LoadingSpinner from '../../Components/Common/LoadingSpinner';

const ArticleDetailPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ArticleDetail />
      </Suspense>
    </>
  );
};

export default ArticleDetailPage;
