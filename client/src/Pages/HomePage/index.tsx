import { Suspense } from 'react';
import ArticleList from '../../Components/Article/ArticleList';
import Banner from '../../Components/Banner';
import LoadingSpinner from '../../Components/Common/LoadingSpinner';

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
        <ArticleList />
      </Suspense>
    </>
  );
};

export default HomePage;
