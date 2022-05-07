import { Suspense } from 'react';
import ArticleList from '../components/article/ArticleList';
import Banner from '../components/Banner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useStore } from '../store/store';

const HomePage = () => {
  const { openAuthModal } = useStore();
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
        <button onClick={openAuthModal}>modal 생성</button>;
        <ArticleList />
      </Suspense>
    </>
  );
};

export default HomePage;
