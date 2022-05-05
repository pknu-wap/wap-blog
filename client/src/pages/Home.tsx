import { Suspense } from 'react';
import ArticleList from '../components/article/ArticleList';
import Banner from '../components/Banner';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
      </Suspense>
    </>
  );
};

export default Home;
